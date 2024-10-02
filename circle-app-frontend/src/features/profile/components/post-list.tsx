// import { apiV1 } from "../../../libs/api";
// import { useAppSelector } from "../../../hooks/use.store";
// import { Thread, ThreadResponseDTO } from "../../home/types/thread.dto";
// import { useEffect, useState } from "react";
// import { ThreadEntity } from "../../../entities/thread";
import { Box } from "@chakra-ui/react";
import PostItem from "../../../components/ui/post-item";
import { ThreadEntity } from "../../../entities/thread";

interface PostListProps {
  threads: ThreadEntity[]; // Define the type for threads
}

export default function PostList({ threads }: PostListProps) {
  return (
    <Box id="post">
      {threads.map((thread) => {
        return (
          <PostItem
            key={thread.id}
            id={thread.id}
            image={
              thread.author?.profilePhoto || ""
            } /* Optional chaining to handle undefined */
            fullName={
              thread.author?.fullname || "Anonymous"
            } /* Optional chaining with default value */
            userName={
              thread.author?.username || "Unknown"
            } /* Optional chaining with default value */
            postContent={thread.content || ""} /* Default empty string */
            postImage={thread.image || ""} /* Default empty string */
            like={
              thread.likes?.length ?? 0
            } /* Optional chaining with default to handle undefined */
            reply={
              thread.replies?.length ?? 0
            } /* Optional chaining with default to handle undefined */
          />
        );
      })}
    </Box>
  );
}
