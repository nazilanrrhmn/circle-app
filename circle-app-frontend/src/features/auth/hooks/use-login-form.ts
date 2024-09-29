import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormInput, loginSchema } from "../schemas/login";
import { LoginRequestDTO, LoginResponseDTO } from "../types/auth.dto";
import Cookies from "js-cookie";
import { apiV1 } from "../../../libs/api";
import { useAppDispatch } from "../../../hooks/use.store";
import { setUser } from "../auth.slice";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function onSubmit({ email, password }: LoginFormInput) {
    try {
      const response = await apiV1.post<
        null,
        { data: LoginResponseDTO },
        LoginRequestDTO
      >("/auth/login", { email, password });

      const { accessToken, user } = response.data.data;

      Cookies.set("token", accessToken, { expires: 2 });
      alert(response.data.message);

      dispatch(setUser(user));

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
