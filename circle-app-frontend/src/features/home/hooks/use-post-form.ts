import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { apiV1 } from "../../../libs/api";
import { PostThreadInput, postThreadSchema } from "../schemas/post-thread";
import { ThreadPostResponseDTO } from "../types/thread.dto";

export function usePostThread() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostThreadInput>({
    resolver: zodResolver(postThreadSchema),
  });

  async function onSubmit(data: PostThreadInput) {
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]); // Append the image if it exists
      }

      const response = await apiV1.post<null, { data: ThreadPostResponseDTO }>(
        "/threads",
        formData
      );

      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1500,
      });
      reset(); // Reset the form upon successful submission
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data); // Log the server's response error
        alert(`Error: ${error.response.data.message}`); // Display the error message
      } else {
        console.error("Unexpected error", error); // Log any unexpected error
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
    reset,
  };
}
