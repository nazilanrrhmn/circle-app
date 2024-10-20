import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/use.store";
import { getDetailThreads } from "../detail-slice";
import RepliesItem from "./replies-item";
import FormReply from "./reply-form";
import ThreadDetail from "./thread-detail";

export default function ThreadDetailPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [threads, setThread] = useState<ThreadEntity>();
  let { id } = useParams();
  const threadId = Number(id);
  // async function getThreads() {
  //   const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(`/threads/${threadId}`);
  //   const data = response.data.data;
  //   return { data: data };
  // }

  const threads = useAppSelector((state) => state.detailThread.entities);
  const loading = useAppSelector((state) => state.detailThread.loading);

  useEffect(() => {
    dispatch(getDetailThreads(threadId));
  }, []);

  if (loading == "pending") {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <HiOutlineArrowLeft
          size={26}
          onClick={() => navigate(-1)}
          cursor={"pointer"}
        />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      {loading == "succeeded" ? (
        <>
          <ThreadDetail
            createdAt={threads.createdAt}
            authorId={threads.authorId}
            id={threads.id}
            profilePhoto={threads?.author.profilePhoto}
            fullName={threads.author.fullname}
            userName={threads?.author.username}
            postContent={threads.content}
            postImage={threads?.image}
            isLike={threads.isLike}
            like={threads.like.length}
            reply={threads.replies.length}
          />
          <FormReply
            threadId={threadId}
            placeholder="Type your reply!"
            buttonTitle="Reply"
          />
          {threads.replies.map((reply) => {
            return (
              <RepliesItem
                createdAt={threads.createdAt}
                key={reply.id}
                authorId={reply.authorId}
                id={reply.id}
                profilePhoto={reply.author.profilePhoto}
                fullName={reply.author.fullname}
                userName={reply.author.username}
                postContent={reply.content}
                like={reply.like_replies.length}
                isLike={reply.isLike}
                postImage={reply.image}
              />
            );
          })}{" "}
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
}
