import { Flex, Image, Text } from "@chakra-ui/react";

interface Post {
  image: string;
  fullName: string;
  userName: string;
  postImage?: string;
}

export default function PostItem({
  image,
  fullName,
  userName,
  postImage,
}: Post) {
  return (
    <Flex
      gap={4}
      padding={4}
      borderY={"solid 1px"}
      borderColor={"brand.borderAbu"}
    >
      <Image
        src={image}
        alt="thumbnail"
        borderColor={"brand.backgroundBox"}
        height={"40px"}
        rounded={"full"}
        objectFit="cover"
      />
      <Flex direction={"column"} gap={2}>
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
        <Text fontSize={"14px"} fontWeight={400} lineHeight={"20px"}>
          Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya
          kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja
          gitu. Ada aja jalannya augmented reality real time puppet I made. You
          can try it now went below in the thread.
        </Text>
        <Image src={postImage} maxWidth={"400px"} rounded={8} />
        <Flex gap={2} marginY={1} alignItems={"center"}>
          <Image src="src/assets/icons/heart.svg" alt="like" height={"18px"} />
          <Text
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"20px"}
            color={"brand.fontSecondary"}
          >
            293
          </Text>
          <Image
            src="src/assets/icons/message-text.svg"
            alt="like"
            height={"18px"}
          />
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
    </Flex>
  );
}
