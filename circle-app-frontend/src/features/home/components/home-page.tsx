import { Box, Text } from "@chakra-ui/react";
import PostItem from "../../../components/ui/post-item";
import CreatePost from "./create-post";
// import axios from "axios";
import { ThreadEntity } from "../../../entities/thread";
import { useEffect, useState } from "react";
import { apiV1 } from "../../../libs/api";
import { ThreadResponseDTO } from "../types/thread.dto";

export default function HomePage() {
  const [threads, setThread] = useState<ThreadEntity[]>([]);

  async function getThreads() {
    const response = await apiV1.get<null, { data: ThreadResponseDTO }>(
      "/threads"
    );
    const data = response.data.data;
    return { data: data };
  }

  useEffect(() => {
    getThreads().then(({ data }) => {
      setThread(data);
    });
  }, []);

  return (
    <Box mt={4}>
      <Text padding={4} fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
        Home
      </Text>
      <CreatePost />
      {threads.map((threads) => {
        return (
          <PostItem
            id={threads.author.id}
            key={threads.id}
            fullName={threads.author.fullname}
            userName={threads.author.username}
            postContent={threads.content}
            postImage={threads.image}
            like={threads.like.length}
            reply={threads.replies.length}
          />
        );
      })}
    </Box>
  );
}
