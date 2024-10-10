import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../hooks/use.store";
import { apiV1 } from "../../../libs/api";
import { getUserLogged } from "../auth.slice";
import { LoginFormInput, loginSchema } from "../schemas/login";
import { LoginRequestDTO, LoginResponseDTO } from "../types/auth.dto";

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

      const { accessToken } = response.data.data;

      Cookies.set("token", accessToken, { expires: 2 });
      // console.log("Token stored in cookies: ", Cookies.get("token"));

      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1000,
      });

      dispatch(getUserLogged());

      navigate("/");
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
    onSubmit,
  };
}
