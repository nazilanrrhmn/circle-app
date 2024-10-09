import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineXCircle } from "react-icons/hi";
import useEditProfile from "../../features/profile/hooks/use-edit-profile";

// Define the shape of the form data
interface EditProfileFormData {
  fullname: string;
  username: string;
  bio: string;
  profilePhoto?: FileList;
  coverPhoto?: FileList;
}

export default function EditProfileModal({
  thumbnailH,
  fullname,
  profilePhoto,
  coverPhoto,
  onClose,
}: {
  thumbnailH: string;
  fullname: string;
  profilePhoto?: string;
  coverPhoto?: string;
  onClose: () => void;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useEditProfile();

  const [coverImage, setCoverImage] = useState<string | undefined>(coverPhoto);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    profilePhoto
  );

  const onImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      onChange(event);
    }
  };

  const handleFormSubmit = async (data: EditProfileFormData) => {
    try {
      const success = await onSubmit(data);
      if (success) {
        onClose(); // Close the modal on successful submission
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <ModalContent
      maxW={"606px"}
      backgroundColor={"brand.backgroundCircle"}
      rounded={15}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalHeader pl={4} pt={2} pb={0} fontSize={"20px"} fontWeight={700}>
          Edit profile
        </ModalHeader>
        <ModalCloseButton color="brand.borderAbu">
          <HiOutlineXCircle size={24} />
        </ModalCloseButton>

        <ModalBody p={4}>
          <Box position={"relative"} marginBottom={12} cursor="pointer">
            {/* Input file for cover photo */}
            <Input
              {...register("coverPhoto")}
              onChange={(e) =>
                onImageChange(e, setCoverImage, register("coverPhoto").onChange)
              }
              id="uploadCoverPhoto"
              type="file"
              variant={"unstyled"}
              border={"none"}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              opacity="0"
              cursor="pointer"
            />
            <Image
              src={coverImage || coverPhoto}
              alt="cover thumbnail"
              height={thumbnailH}
              width={"100%"}
              rounded={8}
              objectFit="cover"
            />
            {/* Profile photo input */}
            <Box position={"absolute"} bottom={"-35px"} left={"14px"}>
              <Box position={"relative"}>
                <Input
                  {...register("profilePhoto")}
                  onChange={(e) =>
                    onImageChange(
                      e,
                      setProfileImage,
                      register("profilePhoto").onChange
                    )
                  }
                  id="uploadProfilePhoto"
                  type="file"
                  variant={"unstyled"}
                  border={"none"}
                  hidden
                />
                <Avatar
                  src={profileImage || profilePhoto}
                  name={fullname}
                  border={"solid 4px"}
                  borderColor={"brand.backgroundCircle"}
                  height={"80px"}
                  width={"80px"}
                  rounded={"full"}
                  objectFit="cover"
                  cursor="pointer"
                />
                <label htmlFor="uploadProfilePhoto">
                  <Image
                    src="/edit-image.svg"
                    alt="edit image"
                    position={"absolute"}
                    top={"20px"}
                    left={"20px"}
                    objectFit="cover"
                    cursor="pointer"
                  />
                </label>
              </Box>
            </Box>
          </Box>

          {/* Other form fields */}
          <Flex direction={"column"} gap={3}>
            <Box position={"relative"}>
              <Text
                position={"absolute"}
                left={4}
                top={1}
                fontSize={"12px"}
                fontWeight={500}
                color={"brand.borderAbu"}
              >
                Name
              </Text>
              <Input
                {...register("fullname")}
                focusBorderColor="brand.green"
                fontSize={"14px"}
                height={"48px"}
                pt={2}
                border={"solid 1px"}
                borderColor={"brand.borderAbu"}
              />
              {errors.fullname && (
                <Text fontSize={13} color={"red"}>
                  * {errors.fullname.message}
                </Text>
              )}
            </Box>
            <Box position={"relative"}>
              <Text
                position={"absolute"}
                left={4}
                top={1}
                fontSize={"12px"}
                fontWeight={500}
                color={"brand.borderAbu"}
              >
                Username
              </Text>
              <Input
                {...register("username")}
                focusBorderColor="brand.green"
                fontSize={"14px"}
                height={"48px"}
                pt={2}
                border={"solid 1px"}
                borderColor={"brand.borderAbu"}
              />
            </Box>
            <Box position={"relative"}>
              <Text
                position={"absolute"}
                left={4}
                top={1}
                fontSize={"12px"}
                fontWeight={500}
                color={"brand.borderAbu"}
              >
                Bio
              </Text>
              <Textarea
                {...register("bio")}
                focusBorderColor="brand.green"
                fontSize={"14px"}
                height={"48px"}
                pt={4}
                border={"solid 1px"}
                borderColor={"brand.borderAbu"}
              />
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter
          padding={4}
          borderTop={"solid 1px"}
          borderColor={"brand.borderAbu"}
        >
          <Button
            disabled={isSubmitting}
            backgroundColor={"brand.green"}
            color={"white"}
            height={"41px"}
            justifyItems={"center"}
            rounded={"full"}
            alignItems={"center"}
            padding={"5px 25px"}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
            type="submit"
          >
            {isSubmitting ? <Spinner /> : "Save"}
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  );
}
