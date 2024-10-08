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
import { useAppSelector } from "../../../hooks/use.store";
import { usePostReply } from "../hooks/use-post-reply";

interface FormReplyProps {
  placeholder: string;
  buttonTitle: string;
  threadId: number;
  onSuccess: () => void; // Tambahkan onSuccess sebagai prop
}

export default function FormReply({
  placeholder,
  buttonTitle,
  threadId,
  onSuccess, // Ambil onSuccess dari props
}: FormReplyProps) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    usePostReply({ threadId });

  const user = useAppSelector((state) => state.auth.entities);
  const [image, setImage] = useState<string | null>(null); // State for image preview
  const [file, setFile] = useState<File | null>(null); // State for the actual file

  // Handle image selection and preview
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile); // Store the file to send in FormData
    }
  };

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setImage(null);
    setFile(null);
  };

  // Submit handler
  const handleFormSubmit = async (data: { content: string }) => {
    const formData = new FormData();
    formData.append("content", data.content);
    if (file) {
      formData.append("image", file); // Attach the file to the FormData
    }

    // Pastikan onSubmit mengembalikan nilai yang dapat dicek
    const success: boolean = await onSubmit(formData);

    if (success) {
      onSuccess(); // Panggil onSuccess setelah reply berhasil dibuat
      setImage(null); // Clear image preview
      setFile(null); // Clear file state
    }
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
            {...register("content", { required: "Reply content is required" })}
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
            onChange={onImageChange}
            id="upload"
            type="file"
            accept="image/*"
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
