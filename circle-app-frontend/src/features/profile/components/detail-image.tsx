import { Flex, Box, Image, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { HiXCircle } from "react-icons/hi";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import PostDetail from "../../detail/components/thread-detail";
import { useEffect, useState } from "react";
import { apiV1 } from "../../../libs/api";
import { ThreadEntity } from "../../../entities/thread";
import { ThreadDetailResponseDTO } from "../../detail/types/thread-detail.dto";
import FormReply from "../../detail/components/reply-form";
import RepliesItem from "../../detail/components/replies-item";

export default function DetailImagePage() {
  const navigate = useNavigate();
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [threads, setThread] = useState<ThreadEntity>();
  let { id } = useParams();
  const threadId = Number(id);

  async function getThreads() {
    const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
      `/threads/${threadId}`
    );
    const data = response.data.data;
    return { data: data };
  }

  useEffect(() => {
    getThreads().then(({ data }) => {
      setThread(data);
    });
  }, []);

  console.log("thread detail", threads);
  if (!threads) {
    return <Spinner />;
  }

  const fullImage = () => {
    setIsContentOpen(false);
  };

  const openContent = () => {
    setIsContentOpen(true);
  };

  return (
    <Flex justifyContent={"space-between"} p={2}>
      <Box flex={"1"} position={"sticky"} top={0} px={2} height={"100vh"}>
        <Box position={"absolute"} top={4} left={2}>
          <HiXCircle
            size={34}
            onClick={() => navigate(-1)}
            cursor={"pointer"}
          />
        </Box>
        <Box
          onClick={isContentOpen ? fullImage : openContent}
          cursor={"pointer"}
          rounded={"full"}
          border={"solid 2px"}
          borderColor={"white"}
          position={"absolute"}
          top={4}
          right={2}
        >
          {isContentOpen ? (
            <HiChevronRight size={24} />
          ) : (
            <HiChevronLeft size={24} />
          )}
        </Box>
        <Image
          src={threads.image}
          height={"100%"}
          width={"100%"}
          rounded={4}
          objectFit="contain"
        />
      </Box>
      {isContentOpen && (
        <Box
          width={"30%"}
          id="imageCard"
          borderLeft={"solid 1px"}
          borderColor={"brand.borderAbu"}
        >
          <PostDetail
            isLike={threads.isLike}
            like={threads.like.length}
            reply={threads.replies.length}
            id={threads.id}
            authorId={threads.authorId}
            profilePhoto={threads.author.profilePhoto}
            fullName={threads.author.fullname}
            userName={threads.author.username}
            postContent={threads.content}
          />
          <FormReply
            threadId={threadId}
            placeholder="Type your reply!"
            buttonTitle="Reply"
          />
          {threads.replies.map((reply) => {
            return (
              <RepliesItem
                authorId={reply.authorId}
                id={reply.id}
                profilePhoto={reply.author.profilePhoto}
                fullName={reply.author.fullname}
                userName={reply.author.username}
                postContent={reply.content}
                like={10}
                postImage={reply.image}
              />
            );
          })}
        </Box>
      )}
    </Flex>
  );
}
