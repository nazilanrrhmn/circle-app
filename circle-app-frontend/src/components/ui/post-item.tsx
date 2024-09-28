import { ThreadEntity } from "../../entities/thread";
import { PostAction } from "./post-action";
import PostContent from "./post-content";

export default function PostItem({
  image,
  fullName,
  userName,
  postImage,
}: ThreadEntity) {
  return (
    <PostContent
      image={image}
      fullName={fullName}
      userName={userName}
      postImage={postImage}
    >
      <PostAction />
    </PostContent>
  );
}
