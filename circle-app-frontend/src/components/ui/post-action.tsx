import { Button, Flex, Image, Text } from "@chakra-ui/react";

export function PostAction({ like, reply }: { like: number; reply: number }) {
  return (
    <Flex gap={4} marginY={1} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Image src="/heart.svg" alt="like" height={"18px"} />
        <Button
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          {like}
        </Button>
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Image src="/icons/message-text.svg" alt="like" height={"18px"} />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          {reply} Replies
        </Text>
      </Flex>
    </Flex>
  );
}

export function RepliesAction({ like }: { like: number }) {
  return (
    <Flex gap={4} marginY={1} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Image src="/heart.svg" alt="like" height={"18px"} />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          {like}
        </Text>
      </Flex>
    </Flex>
  );
}
