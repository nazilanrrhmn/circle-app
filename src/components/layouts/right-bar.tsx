import { Box, Flex, Text } from "@chakra-ui/react";
import ProfileHeading from "../ui/profile-heading";
import OthersAccountItem from "../ui/others-account-item";

export default function RightBar() {
  return (
    <Box width={"563px"}>
      <Flex
        width={"563px"}
        position={"fixed"}
        gap={"16px"}
        direction={"column"}
        borderLeft={"solid 1px"}
        borderColor={"brand.borderAbu"}
        height={"100vh"}
        padding={8}
      >
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text
            fontSize={"20px"}
            fontWeight={700}
            lineHeight={"28px"}
            mb={4}
            backgroundColor={"brand.backgroundBox"}
          >
            My Profile
          </Text>
          <ProfileHeading />
        </Box>
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text
            fontSize={"20px"}
            fontWeight={700}
            lineHeight={"28px"}
            mb={4}
            backgroundColor={"brand.backgroundBox"}
          >
            Suggested for you
          </Text>
          <Flex
            direction={"column"}
            gap={4}
            backgroundColor={"brand.backgroundBox"}
          >
            <OthersAccountItem
              image="src/assets/img/avatar.png"
              fullName="Elon Musk"
              userName="@elonnnn"
            />
            <OthersAccountItem
              image="src/assets/img/avatar.png"
              fullName="Cristiano Ronaldo"
              userName="@cristiano"
            />
            <OthersAccountItem
              image="src/assets/img/avatar.png"
              fullName="Gibran Rakbuming"
              userName="@gibranraka"
            />
            <OthersAccountItem
              image="src/assets/img/avatar.png"
              fullName="Billie Eilish"
              userName="@billieelish"
            />
            <OthersAccountItem
              image="src/assets/img/avatar.png"
              fullName="Najwa Shihab"
              userName="@najwa"
            />
          </Flex>
        </Box>
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text
            fontSize={"16px"}
            fontWeight={700}
            lineHeight={"20px"}
            mb={4}
            backgroundColor={"brand.backgroundBox"}
          >
            Developed by Nazila Nur Rohman •
          </Text>
          <Text
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"16px"}
            color={"brand.fontSecondary"}
            backgroundColor={"brand.backgroundBox"}
          >
            Powered by DumbWays Indonesia • #1Coding Bootcamp
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
