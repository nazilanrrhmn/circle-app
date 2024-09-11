import { Box, Button, Image, Textarea, FormControl } from "@chakra-ui/react";
import { ModalContent, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { HiOutlineXCircle } from "react-icons/hi";

export default function CreatePostModal() {
  return (
    <ModalContent
      maxW={"740px"}
      backgroundColor={"brand.backgroundCircle"}
      rounded={15}
    >
      <ModalCloseButton color="brand.borderAbu">
        <HiOutlineXCircle size={24} />
      </ModalCloseButton>

      <ModalBody mt={10} px={6} pb={4} pt={0}>
        <FormControl
          display={"flex"}
          alignItems={"flex-start"}
          gap={4}
          justifyContent={"space-between"}
        >
          <Image
            src="./profile.png"
            alt="thumbnail"
            borderColor={"brand.backgroundBox"}
            height={"40px"}
            rounded={"full"}
            objectFit="cover"
          />
          <Box flex={"1"}>
            <Textarea
              variant={"unstyled"}
              border={"none"}
              placeholder="What is happening?!"
            />
          </Box>
        </FormControl>
      </ModalBody>
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
        <Image src="./gallery-add.svg" alt="gallery" height={"24px"} />
        <Button
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
          Post
        </Button>
      </Box>
    </ModalContent>
  );
}
