import { useForm } from "react-hook-form";
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from "../schemas/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiV1 } from "../../../libs/api";
import axios from "axios";
import Swal from "sweetalert2";
import { ResetPassRequestDTO, ResetPassResponseDTO } from "../types/auth.dto";
import { useNavigate } from "react-router-dom";

export function useResetPassword(token: string) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onResetPassword({ password }: { password: string }) {
    try {
      const response = await apiV1.post<
        null,
        { data: ResetPassResponseDTO },
        ResetPassRequestDTO
      >(`reset-password/${token}`, { password });
      Swal.fire({
        icon: "success",
        title: "Reset Password Succes",
        text: response.data.message,
        showConfirmButton: true,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
      });

      navigate("/login");
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
    onResetPassword,
  };
}
