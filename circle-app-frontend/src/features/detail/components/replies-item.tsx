import { RepliesAction } from "../../../components/ui/post-action";
import PostContent from "../../../components/ui/post-content";
import { Thread } from "../../home/types/thread.dto";

export default function RepliesItem({
  profilePhoto,
  fullName,
  userName,
  postContent,
  postImage,
  createdAt,
  like,
  isLike,
  id,
  authorId,
}: Omit<Thread, "reply"> & { authorId: number; isLike: boolean }) {
  return (
    <PostContent
      authorId={authorId}
      id={id}
      profilePhoto={profilePhoto}
      fullName={fullName}
      userName={userName}
      postContent={postContent}
      postImage={postImage}
      createdAt={createdAt}
    >
      <RepliesAction like={like} id={id} isLike={isLike} />
    </PostContent>
  );
}
