import { Flex, Image, Text } from "@chakra-ui/react";

export function PostAction() {
  return (
    <Flex gap={4} marginY={1} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Image src="./heart.svg" alt="like" height={"18px"} />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          293
        </Text>
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Image src="./message-text.svg" alt="like" height={"18px"} />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          281 Replies
        </Text>
      </Flex>
    </Flex>
  );
}

export function RepliesAction() {
  return (
    <Flex gap={4} marginY={1} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Image src="./heart.svg" alt="like" height={"18px"} />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          293
        </Text>
      </Flex>
    </Flex>
  );
}
