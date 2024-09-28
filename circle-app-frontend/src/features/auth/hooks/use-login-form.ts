import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormInput, loginSchema } from "../schemas/login";
import { LoginRequestDTO, LoginResponseDTO } from "../types/auth.dto";
import Cookies from "js-cookie";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  async function onSubmit({ email, password }: LoginFormInput) {
    try {
      const response = await axios.post<
        null,
        { data: LoginResponseDTO },
        LoginRequestDTO
      >("http://localhost:3000/api/v1/auth/login", { email, password });
      alert(response.data.message);

      const { accessToken } = response.data.data;

      Cookies.set("token", accessToken, { expires: 2 });

      navigate("/");
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
