import { Box, Flex, Text } from "@chakra-ui/react";
import ProfileHeading from "../ui/profile-heading";
import OthersAccountItem from "../ui/others-account-item";
import { useAppSelector } from "../../hooks/use.store";

export default function RightBar() {
  const user = useAppSelector((state) => state.auth.entities);

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
            profilePhoto={user.profilePhoto}
            fullname={user.fullname}
            username={user.username}
            bio={user.bio}
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
            <OthersAccountItem
              image="./profile.png"
              fullName="Elon Musk"
              userName="@elonnnn"
              isFollow="Follow"
            />
            <OthersAccountItem
              image="./profile.png"
              fullName="Cristiano Ronaldo"
              userName="@cristiano"
              isFollow="Follow"
            />
            <OthersAccountItem
              image="./profile.png"
              fullName="Gibran Rakbuming"
              userName="@gibranraka"
              isFollow="Follow"
            />
            <OthersAccountItem
              image="./profile.png"
              fullName="Billie Eilish"
              userName="@billieelish"
              isFollow="Follow"
            />
            <OthersAccountItem
              image="./profile.png"
              fullName="Najwa Shihab"
              userName="@najwa"
              isFollow="Follow"
            />
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
