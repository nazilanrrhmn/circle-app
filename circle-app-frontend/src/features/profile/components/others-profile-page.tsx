import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import ProfileHeading from "../../../components/ui/profile-heading";
import ProfileTabs from "../../../features/profile/components/profile-tab";

import { useEffect, useState } from "react";
import { UserEntity } from "../../../entities/user";
import { apiV1 } from "../../../libs/api";

export default function ProfilePage() {
  const [user, setUser] = useState<UserEntity>();
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
          id={Number(id)}
          isMyProfile={false}
          buttonTitle={user.isFollow ? "Unfollow" : "Follow"}
          isFollow={user.isFollow}
          profilePhoto={user.profilePhoto}
          fullname={user.fullname}
          username={user.username}
          followers={user.following.length}
          following={user.followers.length}
          bio={user.bio}
          thumbnailH="140px"
        />
      </Box>
      <ProfileTabs threads={user.threads} />
    </Box>
  );
}
