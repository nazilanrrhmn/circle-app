import { Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { apiV1 } from "../../libs/api";

export function PostAction({
  like,
  reply,
  id,
  isLike,
}: {
  like: number;
  reply: number;
  id: number;
  isLike: boolean;
}) {
  const [isThreadLike, setIsThreadLike] = useState<boolean>(isLike);
  const [likeCount, setLikeCount] = useState<number>(like);

  async function onLike(
    event: React.MouseEvent<HTMLDivElement>,
    threadId: number
  ) {
    event.preventDefault();

    try {
      // let response;
      if (isThreadLike) {
        setIsThreadLike(false);
        setLikeCount(likeCount - 1);
        await apiV1.delete(`/threads/like/${threadId}`);
      } else {
        setIsThreadLike(true);
        setLikeCount(likeCount + 1);
        await apiV1.post("/threads/like", { threadId });
      }
      // Swal.fire({
      //   icon: "success",
      //   title: response.data.message,
      //   showConfirmButton: false,
      //   background: "#1D1D1D",
      //   color: "#fff",
      //   iconColor: "#04A51E",
      //   timer: 800,
      // });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex gap={4} marginY={1} alignItems={"center"} alignContent={"center"}>
      <Flex
        gap={2}
        alignItems={"center"}
        cursor={"pointer"}
        onClick={(event) => onLike(event, id)}
      >
        <Image
          src={isThreadLike ? "/icons/heart-red.svg" : "/icons/heart.svg"}
          alt="like"
          height={"18px"}
        />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          {likeCount}
        </Text>
      </Flex>
      <Flex gap={1} alignItems={"center"} alignContent={"center"}>
        <Image
          src="/icons/message-text.svg"
          alt="like"
          mr={1}
          height={"18px"}
        />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          {reply}
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          Replies
        </Text>
      </Flex>
    </Flex>
  );
}

export function RepliesAction({
  like,
  isLike,
  id,
}: {
  like: number;
  id: number;
  isLike: boolean;
}) {
  const [isThreadLike, setIsThreadLike] = useState<boolean>(isLike);
  const [likeCount, setLikeCount] = useState<number>(like);

  async function onLike(
    event: React.MouseEvent<HTMLDivElement>,
    repliesId: number
  ) {
    event.preventDefault();

    try {
      // let response;
      await apiV1.post("/replies/like", { repliesId });
      if (isThreadLike) {
        setIsThreadLike(false);
        setLikeCount(likeCount - 1);
      } else {
        setIsThreadLike(true);
        setLikeCount(likeCount + 1);
      }
      // Swal.fire({
      //   icon: "success",
      //   title: response.data.message,
      //   showConfirmButton: false,
      //   background: "#1D1D1D",
      //   color: "#fff",
      //   iconColor: "#04A51E",
      //   timer: 800,
      // });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex gap={4} marginY={1} alignItems={"center"}>
      <Flex
        gap={2}
        alignItems={"center"}
        onClick={(event) => onLike(event, id)}
      >
        <Image
          src={isThreadLike ? "/icons/heart-red.svg" : "/icons/heart.svg"}
          alt="like"
          height={"18px"}
        />
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          {likeCount}
        </Text>
      </Flex>
    </Flex>
  );
}
