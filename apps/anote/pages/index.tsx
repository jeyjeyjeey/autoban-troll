import * as React from 'react';
import type { NextPage, } from 'next'
import { Container, Box, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import BuildIcon from '@mui/icons-material/Build';
import TokenIcon from '@mui/icons-material/Token';
import type {comment} from './data'
import {annotationDefault} from './data'


const Home: NextPage = () => {
  const [comments, setComments] = React.useState<Array<comment>>(Array());
  const [filename, setFilename] = React.useState<String>();

  function reverseAnnotationOf(anotationType: string, id: string) {
    const foundIndex: number = comments.findIndex(d => d.id == id);
    let foundComment = { ...comments[foundIndex] };
    if (anotationType == "slander") {
      foundComment.annotation!.isSlander = !foundComment.annotation!.isSlander;
    }
    else if (anotationType == "instruction") {
      foundComment.annotation!.isInstruction = !foundComment.annotation!.isInstruction; 
    }
    else if (anotationType == "autonomy") {
      foundComment.annotation!.isAutonomy = !foundComment.annotation!.isAutonomy;
    }
    comments.splice(foundIndex, 1, foundComment);
    setComments(Array(...comments));
  }

  async function changeUploadFile(event: any) {
    const files = event.target.files;
    const text = await readFileAsText(files[0]);
    const parsed = text.split('\n').filter(row => row !== "").map(row => JSON.parse(row))
    let pdata: Array<comment> = parsed;
    pdata.forEach(d => d.annotation = {...annotationDefault})
    setComments(pdata)
    setFilename(files[0].name)
  }

  function readFileAsText(file: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve((reader.result as string) || '');
      reader.readAsText(file);
    });
  }

  function downloadComments() {
    const blob = new Blob([comments.map(comment => JSON.stringify(comment)).join("\n")], {type: "text/json"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = `anotated_${filename}`;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const checkboxStyle = {color: "silver"};
  const chatColorFor = (chatType: string) => {
    if (chatType == "superStickerEvent") {
      return "#004400"
    }
    else if (chatType == "superChatEvent") {
      return "#B8860B"
    }
    else {
      return "inherit"
    }
  }

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
      <Box sx={{ display: 'flex', flexDirection: "column", alignContent: "flex-start" }}>
        <Button variant="contained" component="label" sx={{textAlign: "center", width: "80%", marginBottom: "10px"}}>
          Upload comments
          <input hidden type="file" accept=".jsonl" onChange={changeUploadFile}/>
        </Button>
        <Button variant="contained" component="label" sx={{textAlign: "center", width: "80%"}} onClick={downloadComments}>
          Download comments
        </Button>
      </Box>
      <Box>
        <List dense sx={{ width: '100%', backgroundColor: '#111111', color: 'white' }}>
          {comments.map((comment) => {
            const labelId = `checkbox-list-secondary-label-${comment.id}`;
            return (
              <ListItem
                key={comment.id}
                disablePadding
              >
                <ListItemButton>
                  <Tooltip title="member/moderator">
                    <ListItemIcon>
                      { comment.authorDetails.isChatSponsor && <TokenIcon sx={{color: "white"}}/>}
                      { comment.authorDetails.isChatModerator && <BuildIcon sx={{color: "white"}}/>}
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${comment.authorDetails.displayName}`}
                      src={comment.authorDetails.profileImageUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={comment.authorDetails.displayName}
                    sx={{width: "15%", color: comment.authorDetails.isChatSponsor ? "green" : "silver", fontWeight: "bold"}}
                  />
                  <ListItemText
                    id={labelId}
                    primary={comment.snippet.displayMessage}
                    sx={{width: "60%", backgroundColor: chatColorFor(comment.snippet.type)}}
                  />
                  <Tooltip title="Slander">
                    <Checkbox
                      name="slander"
                      onChange={(e) => reverseAnnotationOf(e.target.name, comment.id)}
                      checked={comment.annotation?.isSlander == true}
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={checkboxStyle}
                    />
                  </Tooltip>
                  <Tooltip title="Instruction">
                  <Checkbox
                    name="instruction"
                    onChange={(e) => reverseAnnotationOf(e.target.name, comment.id)}
                    checked={comment.annotation?.isInstruction == true}
                    inputProps={{ 'aria-labelledby': labelId }}
                    sx={checkboxStyle}
                  />
                  </Tooltip>
                  <Tooltip title="Autonomy">
                  <Checkbox
                    name="autonomy"
                    onChange={(e) => reverseAnnotationOf(e.target.name, comment.id)}
                    checked={comment.annotation?.isAutonomy == true}
                    inputProps={{ 'aria-labelledby': labelId }}
                    sx={checkboxStyle}
                  />
                  </Tooltip>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  )
}

export default Home
