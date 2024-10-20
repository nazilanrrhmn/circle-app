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

export default function EditProfileModal({
  thumbnailH,
  fullname,
  profilePhoto,
  coverPhoto,
}: {
  thumbnailH: string;
  fullname: string;
  profilePhoto?: string;
  coverPhoto?: string;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useEditProfile();

  // State for image previews
  const [profileImage, setProfileImage] = useState<string | undefined>(
    profilePhoto
  );
  const [coverImage, setCoverImage] = useState<string | undefined>(coverPhoto);

  // Function for handling profile image changes
  const onProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0])); // Set new preview if new image is uploaded
      onChange(event);
    } else {
      onChange(event); // Keep the old image if no new file uploaded
    }
  };

  // Function for handling cover image changes
  const onCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImage(URL.createObjectURL(event.target.files[0])); // Set new preview if new image is uploaded
      onChange(event);
    } else {
      onChange(event); // Keep the old image if no new file uploaded
    }
  };

  return (
    <ModalContent
      maxW={"606px"}
      backgroundColor={"brand.backgroundCircle"}
      rounded={15}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader pl={4} pt={2} pb={0} fontSize={"20px"} fontWeight={700}>
          Edit profile
        </ModalHeader>
        <ModalCloseButton color="brand.borderAbu">
          <HiOutlineXCircle size={24} />
        </ModalCloseButton>

        <ModalBody p={4}>
          {/* Cover Image Section */}
          <Box position={"relative"} marginBottom={12}>
            <Image
              src={coverImage || coverPhoto || "/default-cover.png"} // Use the cover image from state or default placeholder
              alt="cover"
              height={thumbnailH}
              width={"100%"}
              rounded={8}
              objectFit="cover"
            />
            <Input
              {...register("coverPhoto")}
              onChange={(e) =>
                onCoverImageChange(e, register("coverPhoto").onChange)
              }
              id="uploadCover"
              type="file"
              variant={"unstyled"}
              border={"none"}
              hidden
            />
            <label htmlFor="uploadCover">
              <Image
                src="/icons/edit-image.svg"
                alt="edit cover image"
                cursor={"pointer"}
                position={"absolute"}
                bottom={4}
                right={4}
                objectFit="cover"
              />
            </label>

            {/* Profile Image Section */}
            <Box position={"absolute"} bottom={"-35px"} left={"14px"}>
              <Box position={"relative"}>
                <Input
                  {...register("profilePhoto")}
                  onChange={(e) =>
                    onProfileImageChange(e, register("profilePhoto").onChange)
                  }
                  id="uploadPhoto"
                  type="file"
                  variant={"unstyled"}
                  border={"none"}
                  hidden
                />
                <Avatar
                  src={profileImage || profilePhoto || "/default-profile.png"} // Use the profile image from state or default placeholder
                  name={fullname}
                  border={"solid 4px"}
                  borderColor={"brand.backgroundCircle"}
                  height={"80px"}
                  width={"80px"}
                  rounded={"full"}
                  objectFit="cover"
                />
                <label htmlFor="uploadPhoto">
                  <Image
                    src="/icons/edit-image.svg"
                    alt="edit profile image"
                    cursor={"pointer"}
                    position={"absolute"}
                    top={"20px"}
                    left={"20px"}
                    objectFit="cover"
                  />
                </label>
              </Box>
            </Box>
          </Box>

          {/* Form fields for editing name, username, and bio */}
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
                defaultValue={fullname}
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
