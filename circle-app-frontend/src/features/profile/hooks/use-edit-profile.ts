import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../hooks/use.store";
import { apiV1 } from "../../../libs/api";
import { getUserLogged } from "../../auth/auth.slice";
import { EditProfileFormInput, editProfileSchema } from "../schemas/edit";
import { EditProfileResponseDTO } from "../types/profile.dto";

export default function useEditProfile() {
  const user = useAppSelector((state) => state.auth.entities);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      profilePhoto: user.profilePhoto,
      coverPhoto: user.coverPhoto,
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

      // Check if new profilePhoto is uploaded, otherwise use the existing one
      if (data.profilePhoto && data.profilePhoto.length > 0) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      } else if (user.profilePhoto) {
        // Append the existing profile photo URL if no new file was uploaded
        formData.append("existingProfilePhoto", user.profilePhoto);
      }

      // Check if new coverPhoto is uploaded, otherwise use the existing one
      if (data.coverPhoto && data.coverPhoto.length > 0) {
        formData.append("coverPhoto", data.coverPhoto[0]);
      } else if (user.coverPhoto) {
        // Append the existing cover photo URL if no new file was uploaded
        formData.append("existingCoverPhoto", user.coverPhoto);
      }

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

      // Dispatch action to update the logged-in user data
      dispatch(getUserLogged());
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: `${error.response.data.message}`,
          background: "#1D1D1D",
          color: "#fff",
        });
      } else {
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
