import { Flex, Box, Image, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { HiXCircle, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import PostDetail from "../../detail/components/thread-detail";
import { useEffect, useState, useCallback } from "react";
import { apiV1 } from "../../../libs/api";
import { ThreadEntity } from "../../../entities/thread";
import { ThreadDetailResponseDTO } from "../../detail/types/thread-detail.dto";
import FormReply from "../../detail/components/reply-form";
import RepliesItem from "../../detail/components/replies-item";

export default function DetailImagePage() {
  const navigate = useNavigate();
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [threads, setThread] = useState<ThreadEntity | null>(null); // Set initial state to null to avoid undefined
  const { id } = useParams();
  const threadId = Number(id);

  // Move getThreads function inside useEffect or use useCallback to memoize it
  const getThreads = useCallback(async () => {
    try {
      const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
        `/threads/${threadId}`
      );
      const data = response.data.data;
      setThread(data);
    } catch (error) {
      console.error("Error fetching threads", error);
    }
  }, [threadId]);

  // Fetch thread data on component mount
  useEffect(() => {
    getThreads();
  }, [getThreads]); // Add getThreads as a dependency

  if (!threads) {
    return <Spinner />;
  }

  const fullImage = () => {
    setIsContentOpen(false);
  };

  const openContent = () => {
    setIsContentOpen(true);
  };

  // Handle the success action after submitting a reply
  const handleReplySuccess = () => {
    // Re-fetch thread data to update the replies
    getThreads();
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
            createdAt={new Date(threads.createdAt).toLocaleTimeString()}
          />
          <FormReply
            threadId={threadId}
            placeholder="Type your reply!"
            buttonTitle="Reply"
            onSuccess={handleReplySuccess} // Pass onSuccess handler to refresh replies
          />
          {threads.replies.map((reply) => {
            return (
              <RepliesItem
                key={reply.id}
                isLike={reply.isLike}
                authorId={reply.authorId}
                id={reply.id}
                profilePhoto={reply.author.profilePhoto}
                fullName={reply.author.fullname}
                userName={reply.author.username}
                postContent={reply.content}
                createdAt={new Date(reply.createdAt).toLocaleTimeString()}
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
