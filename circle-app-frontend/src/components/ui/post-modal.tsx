import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Image,
  Input,
  ModalCloseButton,
  ModalContent,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { HiOutlineXCircle } from "react-icons/hi";
import { useState, ChangeEvent } from "react";
import { usePostThread } from "../../features/home/hooks/use-post-form";
import { useAppSelector } from "../../hooks/use.store";

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    usePostThread();
  const user = useAppSelector((state) => state.auth.entities);
  const content = watch("content");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleFormSubmit = async (data: {
    content: string;
    image?: FileList;
  }) => {
    console.log("Submitting data:", data);
    try {
      await onSubmit(data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
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
                placeholder="What is happening?!"
              />
            </Box>
          </FormControl>
          {errors.content && (
            <Text fontSize={13} color={"red"}>
              * {errors.content.message}
            </Text>
          )}

          {imagePreview && (
            <Box mt={4} position="relative">
              <Image
                src={imagePreview}
                alt="Preview"
                maxHeight={"200px"}
                objectFit={"cover"}
                borderRadius={"md"}
              />
              <IconButton
                aria-label="Remove image"
                icon={<HiOutlineXCircle />}
                position="absolute"
                color="red"
                top={2}
                right={2}
                size="sm"
                onClick={handleRemoveImage}
              />
            </Box>
          )}
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
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <label htmlFor="file-input">
              <Image
                src="/icons/gallery-add.svg"
                alt="gallery"
                height={"24px"}
                cursor={"pointer"}
              />
            </label>
            <Input
              id="file-input"
              type="file"
              display="none"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
            />
          </Box>

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
