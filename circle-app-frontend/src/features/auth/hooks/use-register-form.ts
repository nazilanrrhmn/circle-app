import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/use.store";
import { setUser } from "../auth.slice";
import { RegisterFormInput, registerSchema } from "../schemas/register";
import { RegisterRequestDTO, RegisterResponseDTO } from "../types/auth.dto";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log("user", user);

  async function onSubmit(data: RegisterFormInput) {
    try {
      const response = await axios.post<
        null,
        { data: RegisterResponseDTO },
        RegisterRequestDTO
      >("http://localhost:5000/api/v1/auth/register", {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });
      alert(response.data.message);
      const { accessToken } = response.data.data;

      Cookies.set("token", accessToken, { expires: 2 });

      dispatch(
        setUser({
          id: 1,
          fullname: "fullname",
          email: "email",
          password: "password",
          role: "MEMBER",
        })
      );

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
