import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import ProfileHeading from "../ui/profile-heading";
import OthersAccountItem from "../ui/others-account-item";
import { useAppSelector } from "../../hooks/use.store";
import { useEffect, useState } from "react";
import { apiV1 } from "../../libs/api";
import { UserEntity } from "../../entities/user";

export default function RightBar() {
  const user = useAppSelector((state) => state.auth.entities);
  const [others, setOther] = useState<UserEntity[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  async function getThreads() {
    try {
      const response = await apiV1.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }

  useEffect(() => {
    getThreads().then((data) => {
      setOther(data);
    });
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner />
      </Flex>
    );
  }

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
          {user && (
            <ProfileHeading
              profilePhoto={user.profilePhoto}
              fullname={user.fullname}
              username={user.username}
              bio={user.bio}
              thumbnailH="100px"
            />
          )}
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
                key={other.id}
                image={other.profilePhoto || ""} // Provide default empty string
                fullName={other.fullname || "Unknown"} // Provide default name if fullname is undefined
                userName={other.username || "Unknown"} // Handle undefined userName
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
