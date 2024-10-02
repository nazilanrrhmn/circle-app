import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Thread } from "../../features/home/types/thread.dto";

export default function PostContent({
  profilePhoto,
  fullName,
  userName,
  postContent,
  postImage,
  children,
}: Omit<Thread, "like" | "reply"> & { children: React.ReactNode }) {
  return (
    <Flex
      gap={4}
      padding={4}
      borderBottom={"solid 1px"}
      borderColor={"brand.borderAbu"}
    >
      <Avatar
        src={profilePhoto}
        name={fullName}
        height={"40px"}
        width={"40px"}
      />
      <Flex direction={"column"} gap={2}>
        <Link to="/profile">
          <Flex gap={1}>
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
            <Text
              fontSize={"14px"}
              fontWeight={400}
              lineHeight={"16px"}
              color={"brand.fontSecondary"}
            >
              •
            </Text>
            <Text
              fontSize={"14px"}
              fontWeight={400}
              lineHeight={"16px"}
              color={"brand.fontSecondary"}
            >
              4h
            </Text>
          </Flex>
        </Link>
        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"}>
          {postContent}
        </Text>
        <Image src={postImage} width={"400px"} rounded={8} />
        {children}
      </Flex>
    </Flex>
  );
}
