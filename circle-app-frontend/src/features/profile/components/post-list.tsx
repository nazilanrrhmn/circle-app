import { Box } from "@chakra-ui/react";
import PostItem from "../../../components/ui/post-item";
import { ThreadEntity } from "../../../entities/thread";
// import { formatDistanceToNow } from "date-fns"; // Import date-fns function

export default function PostList({ threads }: { threads: ThreadEntity[] }) {
  // const [threads, setThread] = useState<ThreadEntity[]>([]);
  // const user = useAppSelector((state) => state.auth.entities);

  // async function getUserThread() {
  //   const response = await apiV1.get<null, { data: ThreadResponseDTO }>(`/user/threads/${user.id}`);
  //   const data = response.data.data;
  //   return { data: data };
  // }

  // useEffect(() => {
  //   getUserThread().then(({ data }) => {
  //     setThread(data);
  //   });
  // }, []);

  return (
    <Box id="post">
      {threads.map((thread) => {
        return (
          <PostItem
            authorId={thread.authorId}
            isLike={thread.isLike}
            key={thread.id}
            id={thread.id}
            profilePhoto={thread.author.profilePhoto}
            fullName={thread.author.fullname}
            userName={thread.author.username}
            postContent={thread.content}
            postImage={thread.image}
            createdAt={new Date(thread.createdAt).toLocaleTimeString()}
            like={thread.like.length}
            reply={thread.replies.length}
          />
        );
      })}
    </Box>
  );
}
