import { Box, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostItem from "../../../components/ui/post-item";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadResponseDTO } from "../types/thread.dto";
import CreatePost from "./create-post";

export default function HomePage() {
  const [threads, setThread] = useState<ThreadEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getThreads() {
    try {
      const response = await apiV1.get<null, { data: ThreadResponseDTO }>(
        "/threads"
      );
      const data = response.data.data;
      setThread(data);
    } catch (errors) {
      console.error(errors);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <Box mt={4}>
      <Text padding={4} fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
        Home
      </Text>
      <CreatePost />

      {isLoading ? (
        <Box padding="6">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="3" />
        </Box>
      ) : (
        [...threads]
          .reverse()
          .map((threads) => (
            <PostItem
              authorId={threads.authorId}
              id={threads.id}
              key={threads.id}
              profilePhoto={threads.author.profilePhoto}
              fullName={threads.author.fullname}
              userName={threads.author.username}
              postContent={threads.content}
              postImage={threads.image}
              createdAt={new Date(threads.createdAt).toLocaleTimeString()}
              isLike={threads.isLike}
              like={threads.like.length}
              reply={threads.replies.length}
            />
          ))
      )}
    </Box>
  );
}
