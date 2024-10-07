import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiV1 } from "../../../libs/api";
import {
  PostThreadInput,
  postThreadSchema,
} from "../../home/schemas/post-thread";
import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
// import { ThreadPostRequestDTO } from "../../home/types/thread.dto";
import Swal from "sweetalert2";

export function usePostReply({ threadId }: { threadId: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostThreadInput>({
    resolver: zodResolver(postThreadSchema),
  });

  async function onSubmit(data: PostThreadInput) {
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      // Check if an image is selected and append to formData
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await apiV1.post<
        null,
        { data: ThreadDetailResponseDTO }
      >(
        `/threads/${threadId}/reply`, // Corrected the template literal here
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );

      // const response = await apiV1.post<
      //   null,
      //   { data: ThreadDetailResponseDTO },
      //   ThreadPostRequestDTO
      // >(`/threads/${threadId}/reply`, data);
      // alert(response.data.message);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1000,
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
  };
}
