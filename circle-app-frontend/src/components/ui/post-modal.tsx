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
  CloseButton,
} from "@chakra-ui/react";
import { HiOutlineXCircle } from "react-icons/hi";
import { usePostThread } from "../../features/home/hooks/use-post-form";
import { useAppSelector, useAppDispatch } from "../../hooks/use.store";
import { useState, ChangeEvent } from "react";
import { closeModal } from "../../features/home/modal-slice";

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // Access formState properly
    onSubmit,
    watch,
  } = usePostThread();

  const user = useAppSelector((state) => state.auth.entities);
  const [image, setImage] = useState<string | null>(null);
  const content = watch("content");
  const dispatch = useAppDispatch();

  const onImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      onChange(event);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleFormSubmit = async (data: {
    content: string;
    image?: FileList;
  }) => {
    try {
      await onSubmit(data);
      dispatch(closeModal());
      onClose();
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
              src={user?.profilePhoto}
              name={user?.fullname}
              borderColor={"brand.backgroundBox"}
              height={"40px"}
              width={"40px"}
              rounded={"full"}
              objectFit="cover"
            />
            <Box flex={"1"}>
              <Textarea
                {...register("content", { required: "Content is required" })}
                variant={"unstyled"}
                border={"none"}
                height={"40px"}
                placeholder="What is happening?!"
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
            {isSubmitting ? <Spinner size="sm" color="white" /> : "Post"}
          </Button>
        </Box>
      </form>
    </ModalContent>
  );
}
