import { useForm } from "react-hook-form";
import axios from "axios";
import { PostThradInput, postThreadSchema } from "../schemas/post-thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiV1 } from "../../../libs/api";
import {
  ThreadPostRequestDTO,
  ThreadPostResponseDTO,
} from "../types/thread.dto";
import Swal from "sweetalert2";

export function usePostThread() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostThradInput>({
    resolver: zodResolver(postThreadSchema),
  });

  async function onSubmit({ content }: PostThradInput) {
    try {
      const response = await apiV1.post<
        null,
        { data: ThreadPostResponseDTO },
        ThreadPostRequestDTO
      >("/threads", { content });
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
  };
}
