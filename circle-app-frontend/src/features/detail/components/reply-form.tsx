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
import { CloseIcon } from "@chakra-ui/icons"; // Chakra UI Close Icon
import { useAppSelector } from "../../../hooks/use.store";
import { useState } from "react";
import { usePostReply } from "../../home/hooks/use-reply-form";

export default function FormReply({
  placeholder,
  buttonTitle,
  threadId,
}: {
  placeholder: string;
  buttonTitle: string;
  threadId: number;
}) {
  const { register, handleSubmit, watch, errors, isSubmitting, onSubmit } =
    usePostReply({ threadId });
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

  // Function to remove the image from preview
  const removeImage = () => {
    setImage(null); // Remove image from state
  };

  // Check if user is null and provide a fallback or a loading state
  if (!user) {
    return <Spinner />; // Show a loading spinner or a fallback UI when user is null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        display={"flex"}
        flexDirection={"column"}
        borderBottom={"solid 1px"}
        borderColor={"brand.borderAbu"}
        p={4}
      >
        <Flex alignItems={"flex-start"} gap={4}>
          <Avatar
            src={user.profilePhoto || ""} // Use empty string if no profile photo
            name={user.fullname || "User"} // Fallback for user's name
            borderColor={"brand.backgroundBox"}
            height={"40px"}
            width={"40px"}
            rounded={"full"}
            objectFit="cover"
          />
          <Box flex={"1"}>
            {/* Input content */}
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

            {/* Preview image with close button */}
            {image && (
              <Box position="relative" mt={4}>
                <Image
                  src={image}
                  rounded={8}
                  height="200px"
                  width="100%"
                  objectFit="cover" // Change to "contain" if needed
                />
                <IconButton
                  icon={<CloseIcon />} // Use CloseIcon here
                  position="absolute"
                  top="5px"
                  right="5px"
                  size="sm"
                  aria-label="Remove image"
                  onClick={removeImage}
                  backgroundColor="red.500"
                  color="white"
                  rounded="full"
                  _hover={{ backgroundColor: "red.600" }}
                />
              </Box>
            )}
          </Box>

          {/* Image input and Post button on the right */}
          <Flex alignItems={"center"} gap={4}>
            <label htmlFor="upload">
              <Image
                src="/icons/gallery-add.svg"
                alt="gallery"
                height={"24px"}
                cursor={"pointer"}
              />
            </label>
            <Input
              {...register("image")}
              onChange={(e) => onImageChange(e, register("image").onChange)}
              id="upload"
              type="file"
              variant={"unstyled"}
              border={"none"}
              hidden
            />
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
              isDisabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : `${buttonTitle}`}
            </Button>
          </Flex>
        </Flex>
      </FormControl>
    </form>
  );
}

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
//   IconButton,
// } from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons"; // Chakra UI Close Icon
// import { useAppSelector } from "../../../hooks/use.store";
// import { useState } from "react";
// import { usePostReply } from "../../home/hooks/use-reply-form";

// export default function FormReply({
//   placeholder,
//   buttonTitle,
//   threadId,
// }: {
//   placeholder: string;
//   buttonTitle: string;
//   threadId: number;
// }) {
//   const { register, handleSubmit, watch, errors, isSubmitting, onSubmit } =
//     usePostReply({ threadId });
//   const user = useAppSelector((state) => state.auth.entities);
//   const [image, setImage] = useState<string | null>(null);
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

//   // Function to remove the image from preview
//   const removeImage = () => {
//     setImage(null); // Remove image from state
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl
//         display={"flex"}
//         flexDirection={"column"}
//         borderBottom={"solid 1px"}
//         borderColor={"brand.borderAbu"}
//         p={4}
//       >
//         <Flex alignItems={"flex-start"} gap={4}>
//           <Avatar
//             src={user.profilePhoto}
//             name={user.fullname}
//             borderColor={"brand.backgroundBox"}
//             height={"40px"}
//             width={"40px"}
//             rounded={"full"}
//             objectFit="cover"
//           />
//           <Box flex={"1"}>
//             {/* Input content */}
//             <Input
//               {...register("content")}
//               variant={"unstyled"}
//               border={"none"}
//               placeholder={placeholder}
//             />
//             {errors.content && (
//               <Text fontSize={13} color={"red"}>
//                 * {errors.content.message}
//               </Text>
//             )}

//             {/* Preview image with close button */}
//             {image && (
//               <Box position="relative" mt={4}>
//                 <Image
//                   src={image}
//                   rounded={8}
//                   height="200px"
//                   width="100%"
//                   objectFit="cover" // Change to "contain" if needed
//                 />
//                 <IconButton
//                   icon={<CloseIcon />} // Use CloseIcon here
//                   position="absolute"
//                   top="5px"
//                   right="5px"
//                   size="sm"
//                   aria-label="Remove image"
//                   onClick={removeImage}
//                   backgroundColor="red.500"
//                   color="white"
//                   rounded="full"
//                   _hover={{ backgroundColor: "red.600" }}
//                 />
//               </Box>
//             )}
//           </Box>

//           {/* Image input and Post button on the right */}
//           <Flex alignItems={"center"} gap={4}>
//             <label htmlFor="upload">
//               <Image
//                 src="/icons/gallery-add.svg"
//                 alt="gallery"
//                 height={"24px"}
//                 cursor={"pointer"}
//               />
//             </label>
//             <Input
//               {...register("image")}
//               onChange={(e) => onImageChange(e, register("image").onChange)}
//               id="upload"
//               type="file"
//               variant={"unstyled"}
//               border={"none"}
//               hidden
//             />
//             <Button
//               type="submit"
//               backgroundColor={content ? "brand.green" : "brand.green-dark"}
//               color={content ? "white" : "brand.white-dark"}
//               height={"33px"}
//               justifyItems={"center"}
//               rounded={"full"}
//               alignItems={"center"}
//               padding={4}
//               fontSize={"14px"}
//               fontWeight={700}
//               lineHeight={"17px"}
//               isDisabled={isSubmitting}
//             >
//               {isSubmitting ? <Spinner /> : `${buttonTitle}`}
//             </Button>
//           </Flex>
//         </Flex>
//       </FormControl>
//     </form>
//   );
// }
