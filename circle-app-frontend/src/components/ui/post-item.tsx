import { Link } from "react-router-dom";
import { Thread } from "../../features/home/types/thread.dto";
import { PostAction } from "./post-action";
import PostContent from "./post-content";

export default function PostItem({
  profilePhoto,
  fullName,
  userName,
  postContent,
  postImage,
  createdAt,
  like,
  reply,
  id,
  isLike,
  authorId,
}: Thread & { authorId: number; isLike: boolean }) {
  return (
    <Link to={`/detail-post/${id}`}>
      <PostContent
        authorId={authorId}
        profilePhoto={profilePhoto}
        fullName={fullName}
        userName={userName}
        postContent={postContent}
        postImage={postImage}
        createdAt={createdAt}
        id={id}
      >
        <PostAction isLike={isLike} like={like} reply={reply} id={id} />
      </PostContent>
    </Link>
  );
}
