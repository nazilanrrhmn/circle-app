import { Thread } from "../../features/home/types/thread.dto";
import { PostAction } from "./post-action";
import PostContent from "./post-content";

export default function PostItem({
  image,
  fullName,
  userName,
  postContent,
  postImage,
  like,
  reply,
}: Thread) {
  return (
    <PostContent
      image={image}
      fullName={fullName}
      userName={userName}
      postContent={postContent}
      postImage={postImage}
    >
      <PostAction like={like} reply={reply} />
    </PostContent>
  );
}
