// import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import PostItem from "../../../components/ui/post-item";
import CreatePost from "./create-post";
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
      {threads.map((thread) => {
        return (
          <PostItem
            id={thread.id}
            key={thread.id}
            profilePhoto={thread.author?.profilePhoto}
            fullName={thread.author?.fullname}
            userName={thread.author?.username}
            postContent={thread.content}
            postImage={thread.image}
            like={thread.likes?.length || 0} // Add null check for likes
            reply={thread.replies?.length || 0} // Add null check for replies
          />
        );
      })}
    </Box>
  );
}
