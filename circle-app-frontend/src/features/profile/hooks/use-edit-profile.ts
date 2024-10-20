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
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      profilePhoto: user?.profilePhoto ?? "",
      coverPhoto: user?.coverPhoto ?? "",
      fullname: user?.fullname,
      username: user?.username,
      bio: user?.bio,
    },
  });

  async function onSubmit(data: EditProfileFormInput) {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("bio", data.bio);

      // Mengelola profile photo jika ada perubahan
      if (data.profilePhoto && data.profilePhoto.length > 0) {
        formData.append("profilePhoto", data.profilePhoto[0]); // Menangani file baru
      } else if (user?.profilePhoto) {
        formData.append("existingProfilePhoto", user.profilePhoto); // Jika tidak ada perubahan, kirim yang sudah ada
      } else {
        formData.delete("profilePhoto"); // Hapus dari formData jika tidak ada foto
      }

      // Mengelola cover photo jika ada perubahan
      if (data.coverPhoto && data.coverPhoto.length > 0) {
        formData.append("coverPhoto", data.coverPhoto[0]); // Menangani file baru
      } else if (user?.coverPhoto) {
        formData.append("existingCoverPhoto", user.coverPhoto); // Jika tidak ada perubahan, kirim yang sudah ada
      } else {
        formData.delete("coverPhoto"); // Hapus dari formData jika tidak ada cover photo
      }

      // Mengirimkan data ke API menggunakan axios
      const response = await apiV1.patch<
        null,
        { data: EditProfileResponseDTO }
      >("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Menampilkan pesan sukses jika berhasil
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1000,
      });

      // Mengambil kembali data user terbaru
      dispatch(getUserLogged());
    } catch (error) {
      // Menangani error yang dikembalikan oleh axios
      if (axios.isAxiosError(error) && error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: `${error.response.data.message}`,
          background: "#1D1D1D",
          color: "#fff",
        });
      } else {
        // Menangani error umum yang tidak diantisipasi
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
