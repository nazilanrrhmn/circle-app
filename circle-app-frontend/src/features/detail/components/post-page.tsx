import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import FormPost from "../../../components/ui/post-form";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
import PostDetail from "./post-detail";
import RepliesList from "./replies-list";
import RepliesItem from "./replies-item";

export default function PostPage() {
  const [threads, setThread] = useState<ThreadEntity>();
  let { id } = useParams();

  async function getThreads() {
    const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
      `/threads/${id}`
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
        <HiOutlineArrowLeft size={26} />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      <PostDetail
        image={threads?.author.profilePhoto}
        fullName={threads.author.fullname}
        userName={threads?.author.username}
        postContent={threads.content}
        postImage={threads?.image}
        like={threads.like.length}
        reply={threads.replies.length}
      />
      <FormPost placeholder="Type your reply!" buttonTitle="Reply" />
      {threads.replies.map((reply) => {
        return (
          <RepliesItem
            image={reply.author.profilePhoto}
            fullName={reply.author.fullname}
            userName={reply.author.username}
            postContent={reply.content}
            like={10}
            postImage={reply.image}
          />
        );
      })}
    </Box>
  );
}
