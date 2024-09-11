import { Text, Flex } from "@chakra-ui/react";
import AppLayout from "../../components/layouts/app-layout";
import { HiOutlineArrowLeft } from "react-icons/hi";
import PostDetail from "../../features/detail/components/post-detail";
import FormPost from "../../components/ui/post-form";
import RepliesList from "../../features/detail/components/replies-list";

export default function DetailPost() {
  return (
    <AppLayout>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <HiOutlineArrowLeft size={26} />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      <PostDetail
        image="src/assets/img/avatar.png"
        fullName="Leo Messi"
        userName="@leomessi"
      />
      <FormPost placeholder="Type your reply!" buttonTitle="Reply" />
      <RepliesList />
    </AppLayout>
  );
}
