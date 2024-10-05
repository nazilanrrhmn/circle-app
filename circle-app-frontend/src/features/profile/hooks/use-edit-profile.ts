import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../hooks/use.store";
import { apiV1 } from "../../../libs/api";
import { EditProfileFormInput, editProfileSchema } from "../schemas/edit";
import { EditProfileResponseDTO } from "../types/profile.dto";

export default function useEditProfile() {
  const user = useAppSelector((state) => state.auth.entities);
  const {
    register,
    handleSubmit,
    watch,
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
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("bio", data.bio);
      formData.append("profilePhoto", data.profilePhoto[0]);

      const response = await apiV1.patch<
        null,
        { data: EditProfileResponseDTO }
      >("/users", formData);
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
    watch,
    errors,
    isSubmitting,
    onSubmit,
  };
}
