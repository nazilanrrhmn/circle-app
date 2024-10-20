import { useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "../schemas/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiV1 } from "../../../libs/api";
import { ForgotPassRequestDTO, ForgotPassResponseDTO } from "../types/auth.dto";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

export function useForgotPassword() {
  const [serverMessage, setServerMessage] = useState<string | null>(null); // To store backend message

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSendEmail({ email }: { email: string }) {
    try {
      const response = await apiV1.post<
        null,
        { data: ForgotPassResponseDTO },
        ForgotPassRequestDTO
      >("/forgot-password", { email });
      const instructions = response.data.message;

      setServerMessage(instructions); // Set the server message

      Swal.fire({
        icon: "info",
        title: "Check Your Email",
        text: instructions,
        showConfirmButton: true,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: `${error.response.data.message}`,
          background: "#1D1D1D",
          color: "#fff",
        });
      } else {
        console.error("Unexpected error", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred",
          background: "#1D1D1D",
          color: "#fff",
        });
      }
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSendEmail,
    serverMessage, // Return server message for UI display
  };
}
