import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/use.store";
import { apiV1 } from "../../libs/api";
import OthersAccountItem from "../ui/others-account-item";
import ProfileHeading from "../ui/profile-heading";

// Define the type for the user object
interface User {
  id: number;
  profilePhoto: string;
  fullname: string;
  username: string;
}

export default function RightBar() {
  const user = useAppSelector((state) => state.auth.entities);
  const [others, setOther] = useState<User[]>([]); // Explicitly typing 'others' as an array of 'User'

  async function getThreads() {
    const response = await apiV1.get("/users");
    const data = response.data;
    return { data: data };
  }

  useEffect(() => {
    getThreads().then(({ data }) => {
      setOther(data);
    });
  }, []);

  if (!others.length) {
    return <Spinner />;
  }

  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;

  return (
    <Box position={"sticky"} width={"563px"}>
      <Flex
        position={"sticky"}
        top={0}
        gap={"16px"}
        direction={"column"}
        height={"100vh"}
        padding={8}
      >
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"} mb={4}>
            My Profile
          </Text>
          <ProfileHeading
            profilePhoto={user?.profilePhoto}
            fullname={user?.fullname}
            username={user?.username}
            bio={user?.bio}
            followers={followersCount}
            following={followingCount}
            thumbnailH="100px"
          />
        </Box>
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"} mb={4}>
            Suggested for you
          </Text>
          <Flex direction={"column"} gap={4}>
            {others.slice(0, 5).map((other) => (
              <OthersAccountItem
                id={other.id}
                key={other.id}
                image={other.profilePhoto}
                fullName={other.fullname}
                userName={other.username}
                isFollow="Follow"
              />
            ))}
          </Flex>
        </Box>
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text fontSize={"16px"} fontWeight={700} lineHeight={"20px"} mb={4}>
            Developed by Nazila Nur Rohman •
          </Text>
          <Text
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"16px"}
            color={"brand.fontSecondary"}
          >
            Powered by DumbWays Indonesia • #1Coding Bootcamp
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
