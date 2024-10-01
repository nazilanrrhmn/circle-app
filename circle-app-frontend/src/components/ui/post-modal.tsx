import {
  Avatar,
  Box,
  Button,
  FormControl,
  Image,
  ModalCloseButton,
  ModalContent,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { HiOutlineXCircle } from "react-icons/hi";
import { usePostThread } from "../../features/home/hooks/use-post-form";
import { useAppSelector } from "../../hooks/use.store";

export default function CreatePostModal() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    usePostThread();
  const user = useAppSelector((state) => state.auth.entities);

  return (
    <ModalContent
      maxW={"740px"}
      backgroundColor={"brand.backgroundCircle"}
      rounded={15}
    >
      <ModalCloseButton color="brand.borderAbu">
        <HiOutlineXCircle size={24} />
      </ModalCloseButton>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Image src="/icons/gallery-add.svg" alt="gallery" height={"24px"} />
          <Button
            type="submit"
            backgroundColor={"brand.green-dark"}
            color={"brand.white-dark"}
            height={"33px"}
            justifyItems={"center"}
            rounded={"full"}
            alignItems={"center"}
            padding={4}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
          >
            {isSubmitting ? <Spinner /> : "Post"}
          </Button>
        </Box>
      </form>
    </ModalContent>
  );
}
