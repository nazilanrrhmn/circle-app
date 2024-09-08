import { Box, Text, Flex } from "@chakra-ui/react";
import AppLayout from "../../components/layouts/app-layout";
import ProfileHeading from "../../components/ui/profile-heading";
import ProfileTabs from "../../features/profile/components/profile-tab";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function Profile() {
  return (
    <AppLayout>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <HiOutlineArrowLeft size={26} />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Elon Musk
        </Text>
      </Flex>

      <Box padding={4}>
        <ProfileHeading thumbnailH="140px" />
      </Box>
      <ProfileTabs />
    </AppLayout>
  );
}
