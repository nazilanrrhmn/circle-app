import { RepliesAction } from "../../../components/ui/post-action";
import PostContent from "../../../components/ui/post-content";
import { Thread } from "../../home/types/thread.dto";

export default function RepliesItem({
  profilePhoto,
  fullName,
  userName,
  postContent,
  postImage,
  like,
  isLike,
  id,
  authorId,
  createdAt,
}: Omit<Thread, "reply"> & { authorId: number; isLike: boolean }) {
  return (
    <PostContent
      createdAt={createdAt}
      authorId={authorId}
      id={id}
      profilePhoto={profilePhoto}
      fullName={fullName}
      userName={userName}
      postContent={postContent}
      postImage={postImage}
    >
      <RepliesAction like={like} id={id} isLike={isLike} />
    </PostContent>
  );
}
