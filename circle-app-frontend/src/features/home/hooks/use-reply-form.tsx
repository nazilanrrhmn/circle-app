import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { apiV1 } from "../../../libs/api";
import { PostReplyInput, postReplySchema } from "../schemas/post-reply";
import { ReplyPostResponseDTO } from "../types/thread.dto";

export function usePostReply({ threadId }: { threadId: number }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostReplyInput>({
    resolver: zodResolver(postReplySchema),
  });

  async function onSubmit(data: PostReplyInput) {
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      formData.append("image", data.image[0]);

      const response = await apiV1.post<null, { data: ReplyPostResponseDTO }>(
        `/threads/${threadId}/reply`,
        formData
      );
      // alert(response.data.message);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1500,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data); // Log response error dari server
        alert(`Error: ${error.response.data.message}`); // Tampilkan pesan error
      } else {
        console.error("Unexpected error", error); // Log error yang tidak terduga
        alert("An unexpected error occurred");
      }
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    watch,
  };
}
