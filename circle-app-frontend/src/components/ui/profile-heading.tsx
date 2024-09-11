import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import EditProfileModal from "./profile-modal";

export default function ProfileHeading({ thumbnailH }: { thumbnailH: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position={"relative"} marginBottom={4}>
        <Image
          src="src/assets/img/cover.png"
          alt="thumbnail"
          height={thumbnailH}
          width={"100%"}
          rounded={8}
          objectFit="cover"
        />
        <Image
          src="src/assets/img/avatar.png"
          alt="thumbnail"
          border={"solid 4px"}
          borderColor={"brand.backgroundBox"}
          position={"absolute"}
          bottom={"0px"}
          left={"14px"}
          height={"80px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Flex justifyContent={"flex-end"} marginTop={2}>
          <Button
            onClick={onOpen}
            backgroundColor={"transparent"}
            height={"33px"}
            border={"solid 1px"}
            borderColor={"white"}
            color={"white"}
            rounded={"full"}
            padding={"7px 20px"}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
          >
            Edit Profile
          </Button>
        </Flex>
      </Box>
      <Flex direction={"column"} gap={2}>
        <Text as={"h1"} fontSize={"24px"} fontWeight={700} lineHeight={"32px"}>
          ✨ Stella Audhina ✨
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          @audhinafh
        </Text>
        <Text fontSize={"16px"} fontWeight={400} lineHeight={"24px"}>
          picked over by the worms, and weird fishes
        </Text>
        <Flex gap={4}>
          <Text fontSize={"16px"} fontWeight={700} lineHeight={"24px"}>
            291{" "}
            <Text
              as={"span"}
              fontWeight={400}
              color={"brand.fontSecondary"}
              marginLeft={1}
            >
              Following
            </Text>
          </Text>
          <Text fontSize={"16px"} fontWeight={700} lineHeight={"24px"}>
            310{" "}
            <Text
              as={"span"}
              fontWeight={400}
              color={"brand.fontSecondary"}
              marginLeft={1}
            >
              Followers
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditProfileModal thumbnailH={thumbnailH} />
      </Modal>
    </>
  );
}
