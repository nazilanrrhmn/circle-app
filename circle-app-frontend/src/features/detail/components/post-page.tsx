import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
import PostDetail from "./post-detail";
import RepliesItem from "./replies-item";
import FormReply from "./reply-form";

export default function PostPage() {
  const [threads, setThread] = useState<ThreadEntity | null>(null); // Initialize as null
  const { id } = useParams();
  const threadId = Number(id);

  const getThreads = useCallback(async () => {
    try {
      const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
        `/threads/${threadId}`
      );
      const data = response.data.data;
      return { data: data };
    } catch (error) {
      console.error("Failed to fetch thread details:", error);
      return null; // Return null on error
    }
  }, [threadId]);

  useEffect(() => {
    const fetchThreads = async () => {
      const result = await getThreads();
      if (result) {
        setThread(result.data); // Ensure data is set only if result is valid
      }
    };
    fetchThreads();
  }, [getThreads]);

  console.log("thread detail", threads);

  if (!threads) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <HiOutlineArrowLeft size={26} />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      <PostDetail
        image={threads.author?.profilePhoto || ""}
        fullName={threads.author?.fullname || "Unknown"}
        userName={threads.author?.username || "Unknown"}
        postContent={threads.content}
        postImage={threads.image || ""}
        like={threads.like.length}
        reply={threads.replies.length}
      />
      <FormReply
        threadId={threadId}
        placeholder="Type your reply!"
        buttonTitle="Reply"
      />
      {threads.replies.map((reply) => (
        <RepliesItem
          key={reply.id}
          image={reply.author?.profilePhoto || ""}
          fullName={reply.author?.fullname || "Unknown"}
          userName={reply.author?.username || "Unknown"}
          postContent={reply.content}
          like={10}
          postImage={reply.image || ""}
        />
      ))}
    </Box>
  );
}
