import { Box, Flex, Text } from "@chakra-ui/react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import ProfileHeading from "../../../components/ui/profile-heading";
import ProfileTabs from "../../../features/profile/components/profile-tab";
import { useAppSelector } from "../../../hooks/use.store";

import { useEffect, useState } from "react";
import { ThreadEntity } from "../../../entities/thread";
import { ThreadResponseDTO } from "../../../features/home/types/thread.dto";
import { apiV1 } from "../../../libs/api";

export default function MyProfilePage() {
  const user = useAppSelector((state) => state.auth.entities);
  const [threads, setThread] = useState<ThreadEntity[]>([]);

  async function getUserThread() {
    const response = await apiV1.get<null, { data: ThreadResponseDTO }>(
      `/user/threads/${user.id}`
    );
    const data = response.data.data;
    return { data: data };
  }

  useEffect(() => {
    getUserThread().then(({ data }) => {
      setThread(data);
    });
  }, []);
  return (
    <Box>
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
          id={user.id}
          isFollow={user.isFollow}
          isMyProfile={true}
          buttonTitle={"Edit Profile"}
          profilePhoto={user.profilePhoto}
          fullname={user.fullname}
          username={user.username}
          bio={user.bio}
          followers={user.following.length}
          following={user.followers.length}
          thumbnailH="140px"
        />
      </Box>
      <ProfileTabs threads={threads} />
    </Box>
  );
}
