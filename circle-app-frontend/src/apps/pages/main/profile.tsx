import { Box, Text, Flex } from "@chakra-ui/react";
import AppLayout from "../../../components/layouts/app-layout";
import ProfileHeading from "../../../components/ui/profile-heading";
import ProfileTabs from "../../../features/profile/components/profile-tab";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/use.store";

export default function MyProfile() {
  const user = useAppSelector((state) => state.auth.entities);
  return (
    <AppLayout>
      <Link to="/">
        <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
          <HiOutlineArrowLeft size={26} />
          <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
            Elon Musk
          </Text>
        </Flex>
      </Link>

      <Box padding={4}>
        <ProfileHeading
          profilePhoto={user.profilePhoto}
          fullname={user.fullname}
          username={user.username}
          bio={user.bio}
          thumbnailH="140px"
        />
      </Box>
      <ProfileTabs />
    </AppLayout>
  );
}
