import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Thread } from "../../features/home/types/thread.dto";

export default function PostContent({
  profilePhoto,
  fullName,
  userName,
  postContent,
  postImage,
  createdAt,
  children,
  authorId,
  id,
}: Omit<Thread, "like" | "reply"> & {
  children: React.ReactNode;
  authorId: number;
}) {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/profile/${authorId}`);
  };
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
        onClick={handleClick}
      />
      <Flex direction={"column"} gap={2}>
        <Link to={`/profile/${authorId}`}>
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
              @{userName}
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
              {createdAt}
            </Text>
          </Flex>
        </Link>

        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"}>
          {postContent}
        </Text>
        <Link to={`/detail-image/${id}`}>
          <Image src={postImage} width={"400px"} rounded={8} />
        </Link>
        {children}
      </Flex>
    </Flex>
  );
}
