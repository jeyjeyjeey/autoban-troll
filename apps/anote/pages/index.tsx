import * as React from 'react';
import type { NextPage, } from 'next'
import { Container, Box, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import BuildIcon from '@mui/icons-material/Build';
import TokenIcon from '@mui/icons-material/Token';
import type {comment, annotation} from './data'
import { jsonData } from './data'
import { Foundation } from '@mui/icons-material';


const Home: NextPage = () => {
  function createHandleToggle(setter: Function, toBeSet: Array<number>): Function {
    return (value: number) => () => {
      const currentIndex = toBeSet.indexOf(value);
      const newChecked = [...toBeSet];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setter(newChecked);
    };
  }
  const [checkedSlander, setCheckedSlander] = React.useState<Array<number>>([]);
  const handleToggleSlander = createHandleToggle(setCheckedSlander, checkedSlander)
  const [checkedInstruction, setCheckedInstruction] = React.useState<Array<number>>([]);
  const handleToggleInstruction = createHandleToggle(setCheckedInstruction, checkedInstruction)
  const [checkedAutonomy, setCheckedAutonomy] = React.useState<Array<number>>([]);
  const handleToggleAutonomy = createHandleToggle(setCheckedAutonomy, checkedAutonomy)

  let data: Array<comment> = jsonData;
  const annotationDefault: annotation = {
    isSlander: false,
    isInstruction: false,
    isAutonomy: false
  }
  data.forEach(d => d.annotation = annotationDefault)
  const [comments, setComments] = React.useState<Array<comment>>(data);

  function reverseAnnotationOf(anotationType: string, id: string) {
    // console.log(`slander before set: ${comments[0].annotation?.isSlander}`)
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
    // console.log(`slander after set: ${comments[0].annotation?.isSlander}`)
  }

  return (
    <Container maxWidth="md">
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {comments.map((comment) => {
          const labelId = `checkbox-list-secondary-label-${comment.id}`;
          return (
            <ListItem
              key={comment.id}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  { comment.authorDetails.isChatSponsor && <TokenIcon />}
                  { comment.authorDetails.isChatModerator && <BuildIcon />}
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${comment.authorDetails.displayName}`}
                    src={comment.authorDetails.profileImageUrl}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${comment.snippet.messageText}`} />
                <Checkbox
                  name="slander"
                  edge="end"
                  onChange={(e) => reverseAnnotationOf(e.target.name, comment.id)}
                  checked={comment.annotation?.isSlander == true}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                <Checkbox
                  name="instruction"
                  edge="end"
                  onChange={(e) => reverseAnnotationOf(e.target.name, comment.id)}
                  checked={comment.annotation?.isInstruction == true}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                <Checkbox
                  name="autonomy"
                  edge="end"
                  onChange={(e) => reverseAnnotationOf(e.target.name, comment.id)}
                  checked={comment.annotation?.isAutonomy == true}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
    </Container>
  )
}

export default Home
