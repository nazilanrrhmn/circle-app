import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function ProfileHeading() {
  return (
    <>
      <Box
        position={"relative"}
        marginBottom={4}
        backgroundColor={"brand.backgroundBox"}
      >
        <Image
          src="src/assets/img/cover.png"
          alt="thumbnail"
          height={"100px"}
          width={"100%"}
          rounded={8}
          objectFit="cover"
        />
        <Image
          src="src/assets/img/avatar.png"
          alt="thumbnail"
          border={"solid 4px"}
          borderColor={"brand.backgroundBox"}
          position={"absolute"}
          bottom={"0px"}
          left={"14px"}
          height={"80px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Flex
          justifyContent={"flex-end"}
          marginTop={2}
          backgroundColor={"brand.backgroundBox"}
        >
          <Text
            border={"solid 1px"}
            rounded={"full"}
            padding={"8px 20px"}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
            backgroundColor={"brand.backgroundBox"}
          >
            Edit Profile
          </Text>
        </Flex>
      </Box>
      <Flex
        direction={"column"}
        gap={2}
        backgroundColor={"brand.backgroundBox"}
      >
        <Text
          as={"h1"}
          fontSize={"24px"}
          fontWeight={700}
          lineHeight={"32px"}
          backgroundColor={"brand.backgroundBox"}
        >
          ✨ Nazila Nur Rohman ✨
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
          backgroundColor={"brand.backgroundBox"}
        >
          @nazilnrr
        </Text>
        <Text
          fontSize={"16px"}
          fontWeight={400}
          lineHeight={"24px"}
          backgroundColor={"brand.backgroundBox"}
        >
          picked over by the worms, and weird fishes
        </Text>
        <Flex gap={4} backgroundColor={"brand.backgroundBox"}>
          <Text
            fontSize={"16px"}
            fontWeight={700}
            lineHeight={"24px"}
            backgroundColor={"brand.backgroundBox"}
          >
            100{" "}
            <Text
              as={"span"}
              fontWeight={400}
              color={"brand.fontSecondary"}
              marginLeft={1}
              backgroundColor={"brand.backgroundBox"}
            >
              Following
            </Text>
          </Text>
          <Text
            fontSize={"16px"}
            fontWeight={700}
            lineHeight={"24px"}
            backgroundColor={"brand.backgroundBox"}
          >
            10K{" "}
            <Text
              as={"span"}
              fontWeight={400}
              color={"brand.fontSecondary"}
              marginLeft={1}
              backgroundColor={"brand.backgroundBox"}
            >
              Followers
            </Text>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
