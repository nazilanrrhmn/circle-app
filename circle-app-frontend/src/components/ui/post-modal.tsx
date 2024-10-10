import {
  Avatar,
  Box,
  Button,
  FormControl,
  Image,
  Input,
  ModalCloseButton,
  ModalContent,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { HiOutlineXCircle } from "react-icons/hi";
import { usePostThread } from "../../features/home/hooks/use-post-form";
import { useAppSelector, useAppDispatch } from "../../hooks/use.store";
import { useState, ChangeEvent } from "react";
import { closeModal } from "../../features/home/modal-slice"; // Import closeModal action

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    usePostThread();
  const user = useAppSelector((state) => state.auth.entities);
  const [image, setImage] = useState<string | null>(null);
  const content = watch("content");
  const dispatch = useAppDispatch(); // Use dispatch for Redux actions

  // Function to handle image changes
  const onImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      onChange(event); // Call onChange handler for form register
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (data: {
    content: string;
    image?: FileList;
  }) => {
    try {
      await onSubmit(data);
      dispatch(closeModal()); // Dispatch closeModal to update Redux state
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <ModalContent
      maxW={"740px"}
      backgroundColor={"brand.backgroundCircle"}
      rounded={15}
    >
      <ModalCloseButton color="brand.borderAbu" onClick={onClose}>
        <HiOutlineXCircle size={24} />
      </ModalCloseButton>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box mt={10} px={6} pb={4} pt={0}>
          <FormControl
            display={"flex"}
            alignItems={"flex-start"}
            gap={4}
            justifyContent={"space-between"}
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
              <Textarea
                {...register("content")}
                variant={"unstyled"}
                border={"none"}
                height={"40px"}
                placeholder="What is happening?!"
              />
              {image && <Image src={image} rounded={8} mt={4} />}
            </Box>
          </FormControl>
          {errors.content && (
            <Text fontSize={13} color={"red"}>
              * {errors.content.message}
            </Text>
          )}
          <Input
            {...register("image")}
            onChange={(e) => onImageChange(e, register("image").onChange)}
            id="fileUpload"
            type="file"
            variant={"unstyled"}
            border={"none"}
            hidden
          />
        </Box>
        <Box
          p={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={4}
          px={6}
          borderTop={"solid 1px"}
          borderColor={"brand.borderAbu"}
        >
          <label htmlFor="fileUpload">
            <Image src="/icons/gallery-add.svg" alt="gallery" height={"24px"} />
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
        </Box>
      </form>
    </ModalContent>
  );
}
