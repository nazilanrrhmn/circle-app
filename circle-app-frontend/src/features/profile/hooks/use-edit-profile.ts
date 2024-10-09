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

  async function onSubmit(data: EditProfileFormInput): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("bio", data.bio);

      if (data.profilePhoto && data.profilePhoto[0]) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      }

      if (data.coverPhoto && data.coverPhoto[0]) {
        formData.append("coverPhoto", data.coverPhoto[0]);
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

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: `${error.response.data.message}`,
          background: "#1D1D1D",
          color: "#fff",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return false;
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

// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { useAppSelector } from "../../../hooks/use.store";
// import { apiV1 } from "../../../libs/api";
// import { EditProfileFormInput, editProfileSchema } from "../schemas/edit";
// import { EditProfileResponseDTO } from "../types/profile.dto";

// export default function useEditProfile() {
//   const user = useAppSelector((state) => state.auth.entities);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<EditProfileFormInput>({
//     resolver: zodResolver(editProfileSchema),
//     defaultValues: {
//       fullname: user.fullname,
//       username: user.username,
//       bio: user.bio,
//     },
//   });

//   // Update the onSubmit to return a boolean (true for success, false for failure)
//   async function onSubmit(data: EditProfileFormInput): Promise<boolean> {
//     try {
//       const formData = new FormData();
//       formData.append("fullname", data.fullname);
//       formData.append("username", data.username);
//       formData.append("bio", data.bio);
//       if (data.profilePhoto && data.profilePhoto[0]) {
//         formData.append("profilePhoto", data.profilePhoto[0]);
//       }

//       const response = await apiV1.patch<
//         null,
//         { data: EditProfileResponseDTO }
//       >("/users", formData);

//       // Show success notification
//       Swal.fire({
//         icon: "success",
//         title: response.data.message,
//         showConfirmButton: false,
//         background: "#1D1D1D",
//         color: "#fff",
//         iconColor: "#04A51E",
//         timer: 1000,
//       });

//       // Return true if successful
//       return true;
//     } catch (error) {
//       // Handle error response
//       if (axios.isAxiosError(error) && error.response) {
//         console.error(error.response.data);
//         Swal.fire({
//           icon: "error",
//           title: "Oops..",
//           text: `${error.response.data.message}`,
//           background: "#1D1D1D",
//           color: "#fff",
//         });
//       } else {
//         console.error("Unexpected error", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "An unexpected error occurred",
//           background: "#1D1D1D",
//           color: "#fff",
//         });
//       }

//       // Return false if submission failed
//       return false;
//     }
//   }

//   return {
//     register,
//     handleSubmit,
//     watch,
//     errors,
//     isSubmitting,
//     onSubmit, // Now returns a boolean indicating success
//   };
// }
