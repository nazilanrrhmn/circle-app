import { Box, Text, Flex } from "@chakra-ui/react";
import AppLayout from "../../../components/layouts/app-layout";
import ProfileHeading from "../../../components/ui/profile-heading";
import ProfileTabs from "../../../features/profile/components/profile-tab";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/use.store";
import { useEffect, useState } from "react";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadResponseDTO } from "../../../features/home/types/thread.dto";

export default function MyProfile() {
  const user = useAppSelector((state) => state.auth.entities);
  const [threads, setThread] = useState<ThreadEntity[]>([]);

  async function getUserThread() {
    const response = await apiV1.get<null, { data: ThreadResponseDTO }>(
      `/user/threads/${user?.id}`
    );
    const data = response.data.data;
    return { data: data };
  }

  useEffect(() => {
    if (user?.id) {
      getUserThread().then(({ data }) => {
        setThread(data);
      });
    }
  }, [user]);

  if (!user) {
    return <Text>Loading...</Text>; // Handle the case where the user is not loaded yet
  }

  // Use optional chaining and provide fallback values to avoid undefined errors
  const followersCount = user.followers?.length || 0;
  const followingCount = user.following?.length || 0;

  return (
    <AppLayout>
      <Link to="/">
        <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
          <HiOutlineArrowLeft size={26} />
          <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
            {user.fullname}
          </Text>
        </Flex>
      </Link>

      <Box padding={4}>
        <ProfileHeading
          profilePhoto={user.profilePhoto}
          fullname={user.fullname}
          username={user.username}
          bio={user.bio}
          following={followingCount}
          followers={followersCount}
          thumbnailH="140px"
        />
      </Box>
      <ProfileTabs threads={threads} />
    </AppLayout>
  );
}
