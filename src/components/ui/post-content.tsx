import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Post } from "../../types/post";

export default function PostContent({
  image,
  fullName,
  userName,
  postImage,
  children,
}: Post) {
  return (
    <Link to="/detail-post">
      <Flex
        gap={4}
        padding={4}
        borderTop={"solid 1px"}
        borderColor={"brand.borderAbu"}
      >
        <Avatar
          src={image}
          name="Stella Audhina"
          height={"40px"}
          width={"40px"}
        />
        <Flex direction={"column"} gap={2}>
          <Link to="/profile">
            <Flex gap={1}>
              <Text
                fontSize={"14px"}
                mb={1}
                fontWeight={700}
                lineHeight={"16px"}
              >
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
            Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya
            kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja
            gitu. Ada aja jalannya augmented reality real time puppet I made.
            You can try it now went below in the thread.
          </Text>
          <Image src={postImage} width={"400px"} rounded={8} />
          {children}
        </Flex>
      </Flex>
    </Link>
  );
}
