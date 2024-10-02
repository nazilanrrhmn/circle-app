import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useParams, Link } from "react-router-dom";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
import PostDetail from "./post-detail";
import RepliesItem from "./replies-item";
import FormReply from "./reply-form";

export default function PostPage() {
  const [thread, setThread] = useState<ThreadEntity | null>(null); // Update type
  const { id } = useParams();
  const threadId = Number(id);

  const getThread = useCallback(async () => {
    try {
      const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
        `/threads/${threadId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching thread:", error);
      return null;
    }
  }, [threadId]);

  useEffect(() => {
    getThread().then((data) => {
      if (data) {
        setThread(data);
      }
    });
  }, [getThread]);

  if (!thread) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <Link to={"/"}>
          <HiOutlineArrowLeft size={26} />
        </Link>
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      <PostDetail
        image={thread.author?.profilePhoto || ""}
        fullName={thread.author?.fullname || "Anonymous"}
        userName={thread.author?.username || "Unknown"}
        postContent={thread.content || ""}
        postImage={thread.image || ""}
        like={thread.likes?.length ?? 0} /* Memastikan likes adalah array */
        reply={
          thread.replies?.length ?? 0
        } /* Memastikan replies adalah array */
      />
      <FormReply
        threadId={threadId}
        placeholder="Type your reply!"
        buttonTitle="Reply"
      />
      {thread.replies?.map((reply) => (
        <RepliesItem
          key={reply.id}
          image={reply.author?.profilePhoto || ""}
          fullName={reply.author?.fullname || "Anonymous"}
          userName={reply.author?.username || "Unknown"}
          postContent={reply.content || ""}
          like={10} /* Update with actual like count if available */
          postImage={reply.image || ""}
        />
      ))}
    </Box>
  );
}
