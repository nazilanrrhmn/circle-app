import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
import ThreadDetail from "./thread-detail";
import RepliesItem from "./replies-item";
import FormReply from "./reply-form";

export default function ThreadDetailPage() {
  const navigate = useNavigate();
  const [threads, setThread] = useState<ThreadEntity>();
  let { id } = useParams();
  const threadId = Number(id);

  async function getThreads() {
    const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
      `/threads/${threadId}`
    );
    const data = response.data.data;
    return { data: data };
  }

  useEffect(() => {
    getThreads().then(({ data }) => {
      setThread(data);
    });
  }, []);

  console.log("thread detail", threads);
  if (!threads) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <HiOutlineArrowLeft
          size={26}
          onClick={() => navigate(-1)}
          cursor={"pointer"}
        />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      <ThreadDetail
        authorId={threads.authorId}
        id={threads.id}
        profilePhoto={threads?.author.profilePhoto}
        fullName={threads.author.fullname}
        userName={threads?.author.username}
        postContent={threads.content}
        postImage={threads?.image}
        createdAt={new Date(threads.createdAt).toLocaleString()}
        isLike={threads.isLike}
        like={threads.like.length}
        reply={threads.replies.length}
      />
      <FormReply
        threadId={threadId}
        placeholder="Type your reply!"
        buttonTitle="Reply"
      />
      {threads.replies.map((reply) => {
        return (
          <RepliesItem
            authorId={reply.authorId}
            id={reply.id}
            profilePhoto={reply.author.profilePhoto}
            fullName={reply.author.fullname}
            userName={reply.author.username}
            postContent={reply.content}
            createdAt={new Date(threads.createdAt).toLocaleString()}
            like={reply.like_replies.length}
            isLike={reply.isLike}
            postImage={reply.image}
          />
        );
      })}
    </Box>
  );
}
