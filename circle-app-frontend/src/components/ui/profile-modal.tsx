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

  console.log("Profile: ", profilePhoto);
  console.log("Cover: ", coverPhoto);

  // Function for handling profile image changes
  const onProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 5000000) {
        alert("File too large! Please upload a file smaller than 5MB.");
        return;
      }
      // Create preview of the selected profile image
      setProfileImage(URL.createObjectURL(file));
      onChange(event); // Pass the file to the form handler
    } else {
      onChange(event);
    }
  };

  // Function for handling cover image changes
  const onCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 5000000) {
        alert("File too large! Please upload a file smaller than 5MB.");
        return;
      }
      // Create preview of the selected cover image
      setCoverImage(URL.createObjectURL(file));
      onChange(event); // Pass the file to the form handler
    } else {
      onChange(event);
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
              src={coverImage || coverPhoto} // Show the selected cover image or the default one
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
              accept="image/*"
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
                  accept="image/*"
                  hidden
                />
                <Avatar
                  src={profileImage || profilePhoto} // Show the selected profile image or the default one
                  name={fullname}
                  defaultValue={profilePhoto}
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
                defaultValue={fullname} // Show current fullname
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
