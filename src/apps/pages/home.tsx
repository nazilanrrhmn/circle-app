import { Box, Text } from "@chakra-ui/react";
import AppLayout from "../../components/layouts/app-layout";
import PostList from "../../features/home/components/post-list";

export default function Home() {
  return (
    <AppLayout>
      <Box>
        <Text
          padding={4}
          fontSize={"20px"}
          fontWeight={700}
          lineHeight={"28px"}
          mb={4}
        >
          Home
        </Text>
        <PostList />
      </Box>
    </AppLayout>
  );
}
