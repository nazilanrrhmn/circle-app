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
}: Thread & { id: number }) {
  return (
    <Link to={`/detail-post/${id}`}>
      <PostContent
        profilePhoto={profilePhoto}
        fullName={fullName}
        userName={userName}
        postContent={postContent}
        postImage={postImage}
        createdAt={createdAt}
      >
        <PostAction like={like} reply={reply} />
      </PostContent>
    </Link>
  );
}
