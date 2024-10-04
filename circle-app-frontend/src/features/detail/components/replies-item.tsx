import { RepliesAction } from "../../../components/ui/post-action";
import PostContent from "../../../components/ui/post-content";
import { Thread } from "../../home/types/thread.dto";

export default function RepliesItem({
  image,
  fullName,
  userName,
  postContent,
  postImage,
  createdAt,
  like,
}: Omit<Thread, "reply">) {
  return (
    <PostContent
      image={image}
      fullName={fullName}
      userName={userName}
      postContent={postContent}
      postImage={postImage}
      createdAt={createdAt}
    >
      <RepliesAction like={like} />
    </PostContent>
  );
}
