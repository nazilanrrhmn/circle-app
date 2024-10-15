import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Spinner,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../../hooks/use.store";
import { usePostThread } from "../../features/home/hooks/use-post-form";

export default function FormPost({
  placeholder,
}: {
  placeholder: string;
  buttonTitle: string;
}) {
  // Destructure everything from usePostThread hook
  const {
    onSubmit,
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
    watch,
    reset,
  } = usePostThread();
  const user = useAppSelector((state) => state.auth.entities);
  const [image, setImage] = useState<string | null>(null);

  const content = watch("content");

  const onImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      onChange(event);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleFormSubmit = async (data: { content: string; image?: File }) => {
    await onSubmit(data);
    setImage(null);
    reset();
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
        {user ? (
          <Avatar
            src={user.profilePhoto}
            name={user.fullname}
            borderColor={"brand.backgroundBox"}
            height={"40px"}
            width={"40px"}
            rounded={"full"}
            objectFit="cover"
          />
        ) : (
          <Avatar
            name="Unknown User"
            borderColor={"brand.backgroundBox"}
            height={"40px"}
            width={"40px"}
            rounded={"full"}
          />
        )}
        <Box flex={"1"}>
          <Input
            {...register("content", { required: "Content is required" })}
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
              <Image
                src={image}
                rounded={8}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <CloseButton
                position="absolute"
                top="5px"
                right="5px"
                size="sm"
                onClick={removeImage}
                backgroundColor="red.500"
                color="white"
                _hover={{ backgroundColor: "red.600" }}
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
            {isSubmitting ? <Spinner /> : "Post"}
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
//   Image,
//   Input,
//   Spinner,
//   Text,
//   CloseButton,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { useAppSelector } from "../../hooks/use.store";
// import { useForm } from "react-hook-form";
// import { usePostThread } from "../../features/home/hooks/use-post-form";

// export default function FormPost({
//   placeholder,
// }: // buttonTitle,
// {
//   placeholder: string;
//   buttonTitle: string;
// }) {
//   const { onSubmit, isSubmitting } = usePostThread();
//   const user = useAppSelector((state) => state.auth.entities);
//   const [image, setImage] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm<{ content: string; image?: File }>();

//   const content = watch("content");

//   const onImageChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     onChange: (...event: any[]) => void
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0]));
//       onChange(event);
//     }
//   };

//   const removeImage = () => {
//     setImage(null); // Remove image preview
//   };

//   const handleFormSubmit = async (data: { content: string; image?: File }) => {
//     await onSubmit(data); // Submit the form data
//     setImage(null); // Reset the image preview
//     reset(); // Reset form inputs
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
//         {user ? (
//           <Avatar
//             src={user.profilePhoto}
//             name={user.fullname}
//             borderColor={"brand.backgroundBox"}
//             height={"40px"}
//             width={"40px"}
//             rounded={"full"}
//             objectFit="cover"
//           />
//         ) : (
//           <Avatar
//             name="Unknown User"
//             borderColor={"brand.backgroundBox"}
//             height={"40px"}
//             width={"40px"}
//             rounded={"full"}
//           />
//         )}
//         <Box flex={"1"}>
//           <Input
//             {...register("content", { required: "Content is required" })}
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
//             onChange={(e) => onImageChange(e, register("image").onChange)}
//             id="upload"
//             type="file"
//             variant={"unstyled"}
//             border={"none"}
//             hidden
//           />

//           {image && (
//             <Box position="relative" mt={4}>
//               <Image
//                 src={image}
//                 rounded={8}
//                 height="200px"
//                 width="100%"
//                 objectFit="cover"
//               />
//               <CloseButton
//                 position="absolute"
//                 top="5px"
//                 right="5px"
//                 size="sm"
//                 onClick={removeImage}
//                 backgroundColor="red.500"
//                 color="white"
//                 _hover={{ backgroundColor: "red.600" }}
//               />
//             </Box>
//           )}
//         </Box>

//         <Flex alignItems={"center"} gap={4}>
//           <label htmlFor="upload">
//             <Image
//               src="/icons/gallery-add.svg"
//               alt="gallery"
//               height={"24px"}
//               cursor={"pointer"}
//             />
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
//             {isSubmitting ? <Spinner /> : "Post"}
//           </Button>
//         </Flex>
//       </FormControl>
//     </form>
//   );
// }
