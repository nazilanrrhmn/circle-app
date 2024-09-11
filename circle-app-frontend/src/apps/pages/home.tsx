import { Box, Text } from "@chakra-ui/react";
import AppLayout from "../../components/layouts/app-layout";
import PostList from "../../features/home/components/post-list";
import CreatePost from "../../features/home/components/create-post";

export default function Home() {
  return (
    <AppLayout>
      <Box mt={4}>
        <Text
          padding={4}
          fontSize={"28px"}
          fontWeight={700}
          lineHeight={"28px"}
        >
          Home
        </Text>
        <CreatePost />
        <PostList />
      </Box>
    </AppLayout>
  );
}
