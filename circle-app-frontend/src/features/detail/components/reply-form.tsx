import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  FormControl,
  Spinner,
  Text,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineXCircle } from "react-icons/hi";
import { usePostReply } from "../hooks/use-post-reply";
import { useAppSelector } from "../../../hooks/use.store";

export default function FormReply({
  placeholder,
  buttonTitle,
  threadId,
}: {
  placeholder: string;
  buttonTitle: string;
  threadId: number;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    usePostReply({ threadId });
  const user = useAppSelector((state) => state.auth.entities);
  const [image, setImage] = useState<string | null>(null); // State for image preview

  // Handle image selection and preview
  const onImageChange = (
    event: React.ChangeEvent<HTMLInputElement>, // Explicit type for event
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      onChange(event); // Trigger form submission change
    }
  };

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setImage(null); // Remove image preview
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Hidden file input */}
          <Input
            {...register("image")}
            onChange={(e) => onImageChange(e, register("image").onChange)}
            id="upload"
            type="file"
            variant={"unstyled"}
            border={"none"}
            hidden
          />

          {/* Image preview (if selected) */}
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
          {/* File upload button */}
          <label htmlFor="upload">
            <Image
              src="/icons/gallery-add.svg"
              alt="gallery"
              height={"24px"}
              cursor={"pointer"}
            />
          </label>

          {/* Submit button */}
          <Button
            type="submit"
            backgroundColor={image ? "brand.green" : "brand.green-dark"}
            color={image ? "white" : "brand.white-dark"}
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

// Lawas
// import {
//   Box,
//   Button,
//   Flex,
//   Image,
//   Input,
//   FormControl,
//   Spinner,
//   Text,
//   Avatar,
// } from "@chakra-ui/react";
// import { usePostReply } from "../hooks/use-post-reply";
// import { useAppSelector } from "../../../hooks/use.store";

// export default function FormReply({
//   placeholder,
//   buttonTitle,
//   threadId,
// }: {
//   placeholder: string;
//   buttonTitle: string;
//   threadId: number;
// }) {
//   const { register, handleSubmit, errors, isSubmitting, onSubmit } =
//     usePostReply({ threadId });
//   const user = useAppSelector((state) => state.auth.entities);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl
//         display={"flex"}
//         alignItems={"center"}
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
//         </Box>
//         <Flex alignItems={"center"} gap={4}>
//           <Image src="/icons/gallery-add.svg" alt="gallery" height={"24px"} />
//           <Button
//             type="submit"
//             backgroundColor={"brand.green-dark"}
//             color={"brand.white-dark"}
//             height={"33px"}
//             justifyItems={"center"}
//             rounded={"full"}
//             alignItems={"center"}
//             padding={4}
//             fontSize={"14px"}
//             fontWeight={700}
//             lineHeight={"17px"}
//           >
//             {isSubmitting ? <Spinner /> : `${buttonTitle}`}
//           </Button>
//         </Flex>
//       </FormControl>
//     </form>
//   );
// }
