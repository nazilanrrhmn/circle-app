import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { HiOutlineXCircle } from "react-icons/hi";
import useEditProfile from "../../features/profile/hooks/use-edit-profile";

export default function EditProfileModal({
  thumbnailH,
}: {
  thumbnailH: string;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useEditProfile();

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
          <Box position={"relative"} marginBottom={12}>
            <Image
              src="/thumbnail.png"
              alt="thumbnail"
              height={thumbnailH}
              width={"100%"}
              rounded={8}
              objectFit="cover"
            />
            <Box position={"absolute"} bottom={"-35px"} left={"14px"}>
              <Box position={"relative"}>
                <Image
                  src="/profile.png"
                  alt="thumbnail"
                  border={"solid 4px"}
                  borderColor={"brand.backgroundCircle"}
                  height={"80px"}
                  rounded={"full"}
                  objectFit="cover"
                />
                <Image
                  src="/edit-image.svg"
                  alt="edit image"
                  position={"absolute"}
                  top={"20px"}
                  left={"20px"}
                  objectFit="cover"
                />
              </Box>
            </Box>
          </Box>
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
