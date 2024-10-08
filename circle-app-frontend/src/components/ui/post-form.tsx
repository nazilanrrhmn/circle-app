import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineXCircle } from "react-icons/hi";
import { usePostThread } from "../../features/home/hooks/use-post-form";
import { useAppSelector, useAppDispatch } from "../../hooks/use.store";
import { closeModal } from "../../features/home/modal-slice";
import { ThreadPostRequestDTO } from "../../features/home/types/thread.dto"; // Import tipe yang sesuai

export default function FormPost({
  placeholder,
  buttonTitle,
  refreshThreads,
}: {
  placeholder: string;
  buttonTitle: string;
  refreshThreads: () => void;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    usePostThread();
  const user = useAppSelector((state) => state.auth.entities);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>(null);
  const content = watch("content");

  const onImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      onChange(event);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleFormSubmit = async (data: ThreadPostRequestDTO) => {
    await onSubmit(data); // Submit form (create post)
    refreshThreads(); // Refresh threads to show the latest posts
    // reset(); // Reset form fields after submit
    setImage(null); // Reset image preview
    dispatch(closeModal()); // Close the modal after successful submission
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl
        display={"flex"}
        alignItems={image ? "start" : "center"}
        gap={4}
        justifyContent={"space-between"}
        borderBottom={"solid 1px"}
        borderColor={"brand.borderAbu"}
        p={4}
      >
        <Avatar
          src={user.profilePhoto}
          name={user.fullname}
          borderColor={"brand.backgroundBox"}
          height={"40px"}
          width={"40px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Box flex={"1"}>
          <Input
            {...register("content")}
            variant={"unstyled"}
            border={"none"}
            placeholder={placeholder}
          />
          {errors.content && (
            <Text fontSize={13} color={"red"}>
              * {errors.content.message}
            </Text>
          )}

          <Input
            {...register("image")}
            onChange={(e) => onImageChange(e, register("image").onChange)}
            id="upload"
            type="file"
            variant={"unstyled"}
            border={"none"}
            hidden
          />

          {image && (
            <Box position="relative" mt={4}>
              <Image src={image} rounded={8} />
              <IconButton
                aria-label="Remove image"
                icon={<HiOutlineXCircle />}
                position="absolute"
                top={2}
                right={2}
                size="sm"
                onClick={handleRemoveImage}
              />
            </Box>
          )}
        </Box>
        <Flex alignItems={"center"} gap={4}>
          <label htmlFor="upload">
            <Image
              src="/icons/gallery-add.svg"
              alt="gallery"
              height={"24px"}
              cursor={"pointer"}
            />
          </label>

          <Button
            type="submit"
            backgroundColor={content ? "brand.green" : "brand.green-dark"}
            color={content ? "white" : "brand.white-dark"}
            height={"33px"}
            justifyItems={"center"}
            rounded={"full"}
            alignItems={"center"}
            padding={4}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : `${buttonTitle}`}
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}

// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   IconButton,
//   Image,
//   Input,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { HiOutlineXCircle } from "react-icons/hi";
// import { usePostThread } from "../../features/home/hooks/use-post-form";
// import { useAppSelector, useAppDispatch } from "../../hooks/use.store";
// import { ThreadPostRequestDTO } from "../../features/home/types/thread.dto"; // Import tipe yang sesuai
// import { closeModal } from "../../features/home/modal-slice"; // Import aksi closeModal

// // Tambahkan props untuk mendapatkan post terbaru
// export default function FormPost({
//   placeholder,
//   buttonTitle,
//   refreshThreads, // Tambahkan refreshThreads sebagai prop
// }: {
//   placeholder: string;
//   buttonTitle: string;
//   refreshThreads: () => void; // Function untuk refresh post
// }) {
//   const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
//     usePostThread();
//   const user = useAppSelector((state) => state.auth.entities);
//   const dispatch = useAppDispatch(); // Dispatch untuk Redux action
//   const [image, setImage] = useState<string | null>(null); // Image preview state
//   const content = watch("content");

//   // Handle image selection and preview
//   const onImageChange = (
//     event: React.ChangeEvent<HTMLInputElement>, // Explicit type for event
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // Corrected the onChange type
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0])); // Set preview image
//       onChange(event); // Pass the file for form submission
//     }
//   };

//   // Function to remove the selected image
//   const handleRemoveImage = () => {
//     setImage(null); // Remove the image preview
//   };

//   // Handle post submission and refresh post list after submit
//   const handleFormSubmit = async (data: ThreadPostRequestDTO) => {
//     await onSubmit(data); // Post created
//     refreshThreads(); // Refresh to get latest posts
//     // reset(); // Reset form fields after submit
//     setImage(null); // Reset image preview
//     dispatch(closeModal()); // Close the modal after successful submission
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)}>
//       <FormControl
//         display={"flex"}
//         alignItems={image ? "start" : "center"}
//         gap={4}
//         justifyContent={"space-between"}
//         borderBottom={"solid 1px"}
//         borderColor={"brand.borderAbu"}
//         p={4}
//       >
//         <Avatar
//           src={user.profilePhoto}
//           name={user.fullname}
//           borderColor={"brand.backgroundBox"}
//           height={"40px"}
//           width={"40px"}
//           rounded={"full"}
//           objectFit="cover"
//         />
//         <Box flex={"1"}>
//           <Input
//             {...register("content")}
//             variant={"unstyled"}
//             border={"none"}
//             placeholder={placeholder}
//           />
//           {errors.content && (
//             <Text fontSize={13} color={"red"}>
//               * {errors.content.message}
//             </Text>
//           )}

//           {/* Hidden file input */}
//           <Input
//             {...register("image")}
//             onChange={(e) => onImageChange(e, register("image").onChange)} // Type-safe event handling
//             id="upload"
//             type="file"
//             variant={"unstyled"}
//             border={"none"}
//             hidden
//           />

//           {/* Image preview (if selected) */}
//           {image && (
//             <Box position="relative" mt={4}>
//               <Image src={image} rounded={8} />
//               {/* Remove image button */}
//               <IconButton
//                 aria-label="Remove image"
//                 icon={<HiOutlineXCircle />}
//                 position="absolute"
//                 top={2}
//                 right={2}
//                 size="sm"
//                 onClick={handleRemoveImage}
//               />
//             </Box>
//           )}
//         </Box>
//         <Flex alignItems={"center"} gap={4}>
//           {/* File upload button */}
//           <label htmlFor="upload">
//             <Image
//               src="/icons/gallery-add.svg"
//               alt="gallery"
//               height={"24px"}
//               cursor={"pointer"}
//             />
//           </label>

//           {/* Submit button */}
//           <Button
//             type="submit"
//             backgroundColor={content ? "brand.green" : "brand.green-dark"}
//             color={content ? "white" : "brand.white-dark"}
//             height={"33px"}
//             justifyItems={"center"}
//             rounded={"full"}
//             alignItems={"center"}
//             padding={4}
//             fontSize={"14px"}
//             fontWeight={700}
//             lineHeight={"17px"}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <Spinner /> : `${buttonTitle}`}
//           </Button>
//         </Flex>
//       </FormControl>
//     </form>
//   );
// }

// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   IconButton,
//   Image,
//   Input,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { HiOutlineXCircle } from "react-icons/hi";
// import { usePostThread } from "../../features/home/hooks/use-post-form";
// import { useAppSelector } from "../../hooks/use.store";
// import { ThreadPostRequestDTO } from "../../features/home/types/thread.dto"; // Import tipe yang sesuai

// // Tambahkan props untuk mendapatkan post terbaru
// export default function FormPost({
//   placeholder,
//   buttonTitle,
//   refreshThreads, // Tambahkan refreshThreads sebagai prop
// }: {
//   placeholder: string;
//   buttonTitle: string;
//   refreshThreads: () => void; // Function untuk refresh post
// }) {
//   const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
//     usePostThread();
//   const user = useAppSelector((state) => state.auth.entities);
//   const [image, setImage] = useState<string | null>(null); // Image preview state
//   const content = watch("content");

//   // Handle image selection and preview
//   const onImageChange = (
//     event: React.ChangeEvent<HTMLInputElement>, // Explicit type for event
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // Corrected the onChange type
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0])); // Set preview image
//       onChange(event); // Pass the file for form submission
//     }
//   };

//   // Function to remove the selected image
//   const handleRemoveImage = () => {
//     setImage(null); // Remove the image preview
//   };

//   // Handle post submission and refresh post list after submit
//   const handleFormSubmit = async (data: ThreadPostRequestDTO) => {
//     await onSubmit(data); // Post created
//     refreshThreads(); // Refresh to get latest posts
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)}>
//       <FormControl
//         display={"flex"}
//         alignItems={image ? "start" : "center"}
//         gap={4}
//         justifyContent={"space-between"}
//         borderBottom={"solid 1px"}
//         borderColor={"brand.borderAbu"}
//         p={4}
//       >
//         <Avatar
//           src={user.profilePhoto}
//           name={user.fullname}
//           borderColor={"brand.backgroundBox"}
//           height={"40px"}
//           width={"40px"}
//           rounded={"full"}
//           objectFit="cover"
//         />
//         <Box flex={"1"}>
//           <Input
//             {...register("content")}
//             variant={"unstyled"}
//             border={"none"}
//             placeholder={placeholder}
//           />
//           {errors.content && (
//             <Text fontSize={13} color={"red"}>
//               * {errors.content.message}
//             </Text>
//           )}

//           {/* Hidden file input */}
//           <Input
//             {...register("image")}
//             onChange={(e) => onImageChange(e, register("image").onChange)} // Type-safe event handling
//             id="upload"
//             type="file"
//             variant={"unstyled"}
//             border={"none"}
//             hidden
//           />

//           {/* Image preview (if selected) */}
//           {image && (
//             <Box position="relative" mt={4}>
//               <Image src={image} rounded={8} />
//               {/* Remove image button */}
//               <IconButton
//                 aria-label="Remove image"
//                 icon={<HiOutlineXCircle />}
//                 position="absolute"
//                 top={2}
//                 right={2}
//                 size="sm"
//                 onClick={handleRemoveImage}
//               />
//             </Box>
//           )}
//         </Box>
//         <Flex alignItems={"center"} gap={4}>
//           {/* File upload button */}
//           <label htmlFor="upload">
//             <Image
//               src="/icons/gallery-add.svg"
//               alt="gallery"
//               height={"24px"}
//               cursor={"pointer"}
//             />
//           </label>

//           {/* Submit button */}
//           <Button
//             type="submit"
//             backgroundColor={content ? "brand.green" : "brand.green-dark"}
//             color={content ? "white" : "brand.white-dark"}
//             height={"33px"}
//             justifyItems={"center"}
//             rounded={"full"}
//             alignItems={"center"}
//             padding={4}
//             fontSize={"14px"}
//             fontWeight={700}
//             lineHeight={"17px"}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <Spinner /> : `${buttonTitle}`}
//           </Button>
//         </Flex>
//       </FormControl>
//     </form>
//   );
// }

// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   IconButton,
//   Image,
//   Input,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { HiOutlineXCircle } from "react-icons/hi";
// import { usePostThread } from "../../features/home/hooks/use-post-form";
// import { useAppSelector } from "../../hooks/use.store";

// export default function FormPost({
//   placeholder,
//   buttonTitle,
// }: {
//   placeholder: string;
//   buttonTitle: string;
// }) {
//   const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
//     usePostThread();
//   const user = useAppSelector((state) => state.auth.entities);
//   const [image, setImage] = useState<string | null>(null); // Image preview state
//   const content = watch("content");

//   // Handle image selection and preview
//   const onImageChange = (
//     event: React.ChangeEvent<HTMLInputElement>, // Explicit type for event
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // Corrected the onChange type
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0])); // Set preview image
//       onChange(event); // Pass the file for form submission
//     }
//   };

//   // Function to remove the selected image
//   const handleRemoveImage = () => {
//     setImage(null); // Remove the image preview
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl
//         display={"flex"}
//         alignItems={image ? "start" : "center"}
//         gap={4}
//         justifyContent={"space-between"}
//         borderBottom={"solid 1px"}
//         borderColor={"brand.borderAbu"}
//         p={4}
//       >
//         <Avatar
//           src={user.profilePhoto}
//           name={user.fullname}
//           borderColor={"brand.backgroundBox"}
//           height={"40px"}
//           width={"40px"}
//           rounded={"full"}
//           objectFit="cover"
//         />
//         <Box flex={"1"}>
//           <Input
//             {...register("content")}
//             variant={"unstyled"}
//             border={"none"}
//             placeholder={placeholder}
//           />
//           {errors.content && (
//             <Text fontSize={13} color={"red"}>
//               * {errors.content.message}
//             </Text>
//           )}

//           {/* Hidden file input */}
//           <Input
//             {...register("image")}
//             onChange={(e) => onImageChange(e, register("image").onChange)} // Type-safe event handling
//             id="upload"
//             type="file"
//             variant={"unstyled"}
//             border={"none"}
//             hidden
//           />

//           {/* Image preview (if selected) */}
//           {image && (
//             <Box position="relative" mt={4}>
//               <Image src={image} rounded={8} />
//               {/* Remove image button */}
//               <IconButton
//                 aria-label="Remove image"
//                 icon={<HiOutlineXCircle />}
//                 position="absolute"
//                 top={2}
//                 right={2}
//                 size="sm"
//                 onClick={handleRemoveImage}
//               />
//             </Box>
//           )}
//         </Box>
//         <Flex alignItems={"center"} gap={4}>
//           {/* File upload button */}
//           <label htmlFor="upload">
//             <Image
//               src="/icons/gallery-add.svg"
//               alt="gallery"
//               height={"24px"}
//               cursor={"pointer"}
//             />
//           </label>

//           {/* Submit button */}
//           <Button
//             type="submit"
//             backgroundColor={content ? "brand.green" : "brand.green-dark"}
//             color={content ? "white" : "brand.white-dark"}
//             height={"33px"}
//             justifyItems={"center"}
//             rounded={"full"}
//             alignItems={"center"}
//             padding={4}
//             fontSize={"14px"}
//             fontWeight={700}
//             lineHeight={"17px"}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <Spinner /> : `${buttonTitle}`}
//           </Button>
//         </Flex>
//       </FormControl>
//     </form>
//   );
// }

// Lawas
// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   Image,
//   Input,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { usePostThread } from "../../features/home/hooks/use-post-form";
// import { useAppSelector } from "../../hooks/use.store";

// export default function FormPost({
//   placeholder,
//   buttonTitle,
// }: {
//   placeholder: string;
//   buttonTitle: string;
// }) {
//   const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
//     usePostThread();
//   const user = useAppSelector((state) => state.auth.entities);
//   const [image, setImage] = useState<string | null>(null);
//   const content = watch("content");

//   const onImageChage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     onChange: (...event: any[]) => void
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0]));
//       onChange(event);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl
//         display={"flex"}
//         alignItems={image ? "start" : "center"}
//         gap={4}
//         justifyContent={"space-between"}
//         borderBottom={"solid 1px"}
//         borderColor={"brand.borderAbu"}
//         p={4}
//       >
//         <Avatar
//           src={user.profilePhoto}
//           name={user.fullname}
//           borderColor={"brand.backgroundBox"}
//           height={"40px"}
//           width={"40px"}
//           rounded={"full"}
//           objectFit="cover"
//         />
//         <Box flex={"1"}>
//           <Input
//             {...register("content")}
//             variant={"unstyled"}
//             border={"none"}
//             placeholder={placeholder}
//           />
//           {errors.content && (
//             <Text fontSize={13} color={"red"}>
//               * {errors.content.message}
//             </Text>
//           )}
//           <Input
//             {...register("image")}
//             onChange={(e) => onImageChage(e, register("image").onChange)}
//             id="upload"
//             type="file"
//             variant={"unstyled"}
//             border={"none"}
//             hidden
//           />
//           {image && <Image src={image} rounded={8} mt={4} />}
//         </Box>
//         <Flex alignItems={"center"} gap={4}>
//           <label htmlFor="upload">
//             <Image src="/icons/gallery-add.svg" alt="gallery" height={"24px"} />
//           </label>
//           <Button
//             type="submit"
//             backgroundColor={content ? "brand.green" : "brand.green-dark"}
//             color={content ? "white" : "brand.white-dark"}
//             height={"33px"}
//             justifyItems={"center"}
//             rounded={"full"}
//             alignItems={"center"}
//             padding={4}
//             fontSize={"14px"}
//             fontWeight={700}
//             lineHeight={"17px"}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <Spinner /> : `${buttonTitle}`}
//           </Button>
//         </Flex>
//       </FormControl>
//     </form>
//   );
// }
