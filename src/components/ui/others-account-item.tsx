import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface Account {
  image: string;
  fullName: string;
  userName: string;
}

export default function OthersAccountItem({
  image,
  fullName,
  userName,
}: Account) {
  return (
    <Flex
      justifyContent={"space-between"}
      backgroundColor={"brand.backgroundBox"}
    >
      <Flex gap={2} backgroundColor={"brand.backgroundBox"}>
        <Image
          src={image}
          alt="thumbnail"
          borderColor={"brand.backgroundBox"}
          height={"40px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Box backgroundColor={"brand.backgroundBox"}>
          <Text
            fontSize={"14px"}
            mb={1}
            fontWeight={700}
            lineHeight={"16px"}
            backgroundColor={"brand.backgroundBox"}
          >
            {fullName}
          </Text>
          <Text
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"16px"}
            color={"brand.fontSecondary"}
            backgroundColor={"brand.backgroundBox"}
          >
            {userName}
          </Text>
        </Box>
      </Flex>
      <Box
        height={"33px"}
        justifyItems={"center"}
        border={"solid 1px"}
        rounded={"full"}
        alignItems={"center"}
        padding={"7px 20px"}
        fontSize={"14px"}
        fontWeight={700}
        lineHeight={"17px"}
        backgroundColor={"brand.backgroundBox"}
      >
        Follow
      </Box>
    </Flex>
  );
}
