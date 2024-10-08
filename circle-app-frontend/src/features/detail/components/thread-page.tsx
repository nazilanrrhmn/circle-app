import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { ThreadEntity } from "../../../entities/thread";
import { apiV1 } from "../../../libs/api";
import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
import ThreadDetail from "./thread-detail";
import RepliesItem from "./replies-item";
import FormReply from "./reply-form";

export default function ThreadDetailPage() {
  const [threads, setThread] = useState<ThreadEntity | null>(null); // Tambahkan null sebagai initial state
  const [shouldRefresh, setShouldRefresh] = useState(false); // State untuk memicu refresh
  const { id } = useParams();
  const threadId = Number(id);

  // Fungsi untuk mendapatkan thread dari API
  const getThreads = useCallback(async () => {
    try {
      const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
        `/threads/${threadId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching thread:", error);
      return null;
    }
  }, [threadId]);

  // useEffect untuk memanggil ulang API setiap kali halaman di-load atau ketika reply baru dibuat (shouldRefresh berubah)
  useEffect(() => {
    getThreads().then((data) => {
      if (data) {
        setThread(data);
      }
    });
  }, [getThreads, shouldRefresh]); // shouldRefresh ditambahkan ke dependencies

  // Handler yang dipanggil ketika reply berhasil dibuat
  const handleReplySuccess = () => {
    setShouldRefresh((prev) => !prev); // Toggle shouldRefresh untuk memicu refresh ulang
  };

  if (!threads) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
        <HiOutlineArrowLeft size={26} />
        <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
          Status
        </Text>
      </Flex>
      <ThreadDetail
        authorId={threads.authorId}
        id={threads.id}
        profilePhoto={threads?.author.profilePhoto}
        fullName={threads.author.fullname}
        userName={threads?.author.username}
        postContent={threads.content}
        postImage={threads?.image}
        createdAt={new Date(threads.createdAt).toLocaleString()}
        isLike={threads.isLike}
        like={threads.like.length}
        reply={threads.replies.length}
      />
      <FormReply
        threadId={threadId}
        placeholder="Type your reply!"
        buttonTitle="Reply"
        onSuccess={handleReplySuccess} // Kirimkan handler ke FormReply
      />
      {threads.replies.map((reply) => {
        return (
          <RepliesItem
            key={reply.id} // Tambahkan key untuk setiap reply
            authorId={reply.authorId}
            id={reply.id}
            profilePhoto={reply.author.profilePhoto}
            fullName={reply.author.fullname}
            userName={reply.author.username}
            postContent={reply.content}
            createdAt={new Date(reply.createdAt).toLocaleTimeString()}
            like={reply.like_replies.length}
            isLike={reply.isLike}
            postImage={reply.image}
          />
        );
      })}
    </Box>
  );
}

// import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
// import { useEffect, useState, useCallback } from "react";
// import { HiOutlineArrowLeft } from "react-icons/hi";
// import { useParams, Link } from "react-router-dom";
// import { ThreadEntity } from "../../../entities/thread";
// import { apiV1 } from "../../../libs/api";
// import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
// import ThreadDetail from "./thread-detail";
// import RepliesItem from "./replies-item";
// import FormReply from "./reply-form";

// export default function PostPage() {
//   const [thread, setThread] = useState<ThreadEntity | null>(null);
//   const { id } = useParams();
//   const threadId = Number(id);

//   const getThread = useCallback(async () => {
//     try {
//       const response = await apiV1.get<null, { data: ThreadDetailResponseDTO }>(
//         `/threads/${threadId}`
//       );
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching thread:", error);
//       return null;
//     }
//   }, [threadId]);

//   useEffect(() => {
//     getThread().then((data) => {
//       if (data) {
//         setThread(data);
//       }
//     });
//   }, [getThread]);

//   if (!thread) {
//     return <Spinner />;
//   }

//   return (
//     <Box>
//       <Flex mt={4} padding={4} gap={3} alignItems={"center"}>
//         <Link to={"/"}>
//           <HiOutlineArrowLeft size={26} />
//         </Link>
//         <Text fontSize={"28px"} fontWeight={700} lineHeight={"28px"}>
//           Status
//         </Text>
//       </Flex>
//       <ThreadDetail
//         id={thread.id}
//         image={thread.author?.profilePhoto || ""}
//         fullName={thread.author?.fullname || "Anonymous"}
//         userName={thread.author?.username || "Unknown"}
//         postContent={thread.content || ""}
//         postImage={thread.image || ""}
//         createdAt={new Date(thread.createdAt).toLocaleString()}
//         like={thread.like?.length ?? 0}
//         reply={thread.replies?.length ?? 0}
//         isLike={thread.isLike ?? false} // Pastikan ini diisi dengan boolean
//         authorId={thread.author?.id ?? 0} // Pastikan ini berisi ID penulis
//       />
//       <FormReply
//         threadId={threadId}
//         placeholder="Type your reply!"
//         buttonTitle="Reply"
//       />
//       {thread.replies?.map((reply) => (
//         <RepliesItem
//           key={reply.id}
//           id={reply.id}
//           image={reply.author?.profilePhoto || ""}
//           fullName={reply.author?.fullname || "Anonymous"}
//           userName={reply.author?.username || "Unknown"}
//           postContent={reply.content || ""}
//           postImage={reply.image || ""}
//           like={reply.like?.length ?? 0}
//           createdAt={new Date(reply.createdAt).toLocaleString()}
//           authorId={reply.author?.id || 0}
//         />
//       ))}
//     </Box>
//   );
// }
