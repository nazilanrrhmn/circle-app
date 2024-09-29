import { ThreadEntity } from "../../../entities/thread";
import PostContent from "../../../components/ui/post-content";
import { RepliesAction } from "../../../components/ui/post-action";

export default function RepliesItem({
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
      <RepliesAction />
    </PostContent>
  );
}
