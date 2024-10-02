import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Thread } from "../../home/types/thread.dto";

export default function PostDetail({
  image,
  fullName,
  userName,
  postImage,
  postContent,
  like,
  reply,
}: Thread) {
  return (
    <Flex
      direction={"column"}
      gap={3}
      padding={4}
      borderBottom={"solid 1px"}
      borderColor={"brand.borderAbu"}
    >
      <Flex gap={3}>
        <Avatar
          src={image}
          name={fullName}
          borderColor={"brand.backgroundBox"}
          height={"40px"}
          width={"40px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Link to="/profile">
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
              @{userName}
            </Text>
          </Box>
        </Link>
      </Flex>
      <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"}>
        {postContent}
      </Text>
      <Image src={postImage} width={"400px"} rounded={8} />
      <Flex gap={1} mb={1}>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          11:32 PM
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          •
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          Jul 26, 2023
        </Text>
      </Flex>
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
    </Flex>
  );
}
