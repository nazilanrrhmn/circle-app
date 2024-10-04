import { Box, Text, Flex, Spinner } from "@chakra-ui/react";
import AppLayout from "../../../components/layouts/app-layout";
import ProfileHeading from "../../../components/ui/profile-heading";
import ProfileTabs from "../../../features/profile/components/profile-tab";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/use.store";

import { useEffect, useState } from "react";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadResponseDTO } from "../../../features/home/types/thread.dto";

export default function ProfilePage() {
  const [user, setUser] = useState();
  let { id } = useParams();

  async function getUserThread() {
    const response = await apiV1.get(`/users/${id}`);
    const data = response.data;
    return { data: data };
  }

  useEffect(() => {
    getUserThread().then(({ data }) => {
      setUser(data);
    });
  }, [id]);

  console.log(user);

  if (!user) {
    return <Spinner />;
  }

  return (
    <Box>
      <Link to="/">
        <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
          <HiOutlineArrowLeft size={26} />
          <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
            {user?.fullname}
          </Text>
        </Flex>
      </Link>

      <Box padding={4}>
        <ProfileHeading
          profilePhoto={user.profilePhoto}
          fullname={user.fullname}
          username={user.username}
          following={user.following.length}
          followers={user.followers.length}
          bio={user.bio}
          thumbnailH="140px"
        />
      </Box>
      <ProfileTabs threads={user.threads} />
    </Box>
  );
}
