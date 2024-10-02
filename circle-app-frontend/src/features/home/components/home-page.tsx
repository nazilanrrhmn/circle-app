// import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import PostItem from "../../../components/ui/post-item";
import CreatePost from "./create-post";
import { ThreadEntity } from "../../../entities/thread";
import { useEffect, useState } from "react";
import { apiV1 } from "../../../libs/api";
import { ThreadResponseDTO } from "../types/thread.dto";

export default function HomePage() {
  const [threads, setThreads] = useState<ThreadEntity[]>([]);

  async function getThreads(): Promise<ThreadResponseDTO | null> {
    try {
      const response = await apiV1.get<null, { data: ThreadResponseDTO }>(
        "/threads"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching threads:", error);
      return null;
    }
  }

  useEffect(() => {
    getThreads().then((responseData) => {
      if (responseData) {
        setThreads(responseData.data);
      }
    });
  }, []);

  return (
    <Box mt={4}>
      <Text padding={4} fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
        Home
      </Text>
      <CreatePost />
      {threads.map((thread) => (
        <PostItem
          id={thread.id}
          key={thread.id}
          fullName={thread.author?.fullname || "Anonymous"}
          userName={thread.author?.username || "Unknown"}
          postContent={thread.content || ""}
          postImage={thread.image || ""}
          like={thread.likes?.length ?? 0} /* Memastikan likes adalah array */
          reply={
            thread.replies?.length ?? 0
          } /* Memastikan replies adalah array */
        />
      ))}
    </Box>
  );
}
