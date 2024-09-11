import { Box, Flex, Image, Button } from "@chakra-ui/react";
import ItemMenu from "../ui/menu-item";
import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import CreatePostModal from "../ui/post-modal";

export default function LeftBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width={"417px"}>
      <Flex
        position={"sticky"}
        top={0}
        direction={"column"}
        height={"100vh"}
        padding={8}
      >
        <Box marginBottom={6}>
          <Image h={50} src="src/assets/logo.svg" alt="circle logo" />
        </Box>
        <Flex flexDirection={"column"} gap={2}>
          <ItemMenu
            route="/"
            menuIcon="src/assets/icons/home.svg"
            menuTitle="Home"
          />
          <ItemMenu
            route="/search"
            menuIcon="src/assets/icons/user-search.svg"
            menuTitle="Search"
          />
          <ItemMenu
            route="/follows"
            menuIcon="src/assets/icons/user-search.svg"
            menuTitle="Follows"
          />
          <ItemMenu
            route="/profile"
            menuIcon="src/assets/icons/profile-circle.svg"
            menuTitle="Profile"
          />
          <Button
            onClick={onOpen}
            backgroundColor={"brand.green"}
            color={"white"}
            fontSize={20}
          >
            Create Post
          </Button>
        </Flex>
        <Box mt={"auto"}>
          <ItemMenu
            route="/login"
            menuIcon="src/assets/icons/logout.svg"
            menuTitle="Logout"
          />
        </Box>
      </Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <CreatePostModal />
      </Modal>
    </Box>
  );
}
