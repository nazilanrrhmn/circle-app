import { Post } from "../../types/post";
import { PostAction } from "./post-action";
import PostContent from "./post-content";

export default function PostItem({
  image,
  fullName,
  userName,
  postImage,
}: Post) {
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
