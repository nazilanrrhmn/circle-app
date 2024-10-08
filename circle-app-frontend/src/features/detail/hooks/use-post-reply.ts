import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiV1 } from "../../../libs/api";
import {
  PostThreadInput,
  postThreadSchema,
} from "../../home/schemas/post-thread";
import { ThreadDetailResponseDTO } from "../types/thread-detail.dto";
import Swal from "sweetalert2";

export function usePostReply({ threadId }: { threadId: number }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostThreadInput>({
    resolver: zodResolver(postThreadSchema),
  });

  async function onSubmit(formData: FormData): Promise<boolean> {
    // Change the parameter to FormData
    try {
      const response = await apiV1.post<
        null,
        { data: ThreadDetailResponseDTO }
      >(
        `/threads/${threadId}/reply`,
        formData, // Use FormData as the payload
        {
          headers: {
            "Content-Type": "multipart/form-data", // Correct Content-Type for FormData
          },
        }
      );

      // Show success message
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1000,
      });

      reset(); // Reset form on success
      return true; // Return true if successful
    } catch (error) {
      // Handle different error scenarios
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data); // Log server response error
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Unexpected error", error);
        alert("An unexpected error occurred");
      }
      return false; // Return false if error occurred
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit, // Return onSubmit to be used in the component
  };
}
