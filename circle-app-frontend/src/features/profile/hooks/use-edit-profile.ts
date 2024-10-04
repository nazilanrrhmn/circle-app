import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { apiV1 } from "../../../libs/api";
import { EditProfileFormInput, editProfileSchema } from "../schemas/edit";
import {
  EditProfileRequestDTO,
  EditProfileResponseDTO,
} from "../types/profile.dto";
import { useAppSelector } from "../../../hooks/use.store";

export default function useEditProfile() {
  const user = useAppSelector((state) => state.auth.entities);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullname: user.fullname,
      username: user.username,
      bio: user.bio,
    },
  });

  async function onSubmit(data: EditProfileFormInput) {
    try {
      const response = await apiV1.patch<
        null,
        { data: EditProfileResponseDTO },
        EditProfileRequestDTO
      >("/users", data);
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
