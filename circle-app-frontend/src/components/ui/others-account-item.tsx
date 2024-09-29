import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

interface Account {
  image: string;
  fullName: string;
  userName: string;
  bio?: string;
  isFollow: string;
}

export default function OthersAccountItem({
  image,
  fullName,
  userName,
  bio,
  isFollow,
}: Account) {
  return (
    <Flex gap={2} justifyContent={"space-between"}>
      <Image
        src={image}
        alt="thumbnail"
        borderColor={"brand.backgroundBox"}
        height={"40px"}
        width={"40px"}
        rounded={"full"}
        objectFit="cover"
      />
      <Flex direction={"column"} gap={2} width={"100%"}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"14px"} mb={1} fontWeight={700} lineHeight={"16px"}>
              {fullName}
            </Text>
            <Text
              fontSize={"14px"}
              fontWeight={400}
              lineHeight={"16px"}
              color={"brand.fontSecondary"}
            >
              {userName}
            </Text>
          </Box>
          <Button
            backgroundColor={"transparent"}
            height={"33px"}
            border={"solid 1px"}
            borderColor={"white"}
            color={"white"}
            rounded={"full"}
            padding={"7px 20px"}
            fontSize={"14px"}
            fontWeight={700}
          >
            {isFollow}
          </Button>
        </Flex>
        <Text
          noOfLines={1}
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
        >
          {bio}
        </Text>
      </Flex>
    </Flex>
  );
}
