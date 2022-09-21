import json
import os
from argparse import ArgumentParser
from time import sleep
from typing import Any, List
from urllib import parse, request


class YoutubeChatFether:
    def __init__(self, api_key: str) -> None:
        self.key = api_key

    def get_live_chat_id(self, live_url: str) -> str:
        req_params = parse.urlencode(
            {
                "key": self.key,
                "part": "liveStreamingDetails",
                "id": live_url,
            }
        )
        url = f"https://www.googleapis.com/youtube/v3/videos?{req_params}"
        with request.urlopen(url) as r:
            res = json.loads(r.read().decode(encoding="utf-8"))
            return res["items"][0]["liveStreamingDetails"]["activeLiveChatId"]

    def get_live_chat(
        self, live_chat_id: str, next_page_token: str = None
    ) -> List[dict[str, Any]]:
        params = {
            "key": self.key,
            "part": "snippet, authorDetails",
            "liveChatId": live_chat_id,
        }
        if next_page_token is not None:
            params["pageToken"] = next_page_token
        req_params = parse.urlencode(params)
        url = f"https://www.googleapis.com/youtube/v3/liveChat/messages?{req_params}"
        with request.urlopen(url) as r:
            return json.loads(r.read().decode(encoding="utf-8"))


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("live_url")
    args = parser.parse_args()

    fetcher = YoutubeChatFether(os.environ["YOUTUBE_API_KEY"])

    next_page_token = None
    while True:
        res = fetcher.get_live_chat(
            fetcher.get_live_chat_id(args.live_url), next_page_token
        )
        next_page_token = res["nextPageToken"]

        with open(
            os.path.join("output", f"chat_comments_{args.live_url}.jsonl"),
            "a",
            encoding="utf-8",
        ) as f:
            for line in res["items"]:
                json.dump(line, f, ensure_ascii=False)
                f.write("\n")

        sleep(10)
