import { Box, Flex, Image, Button } from "@chakra-ui/react";
import ItemMenu from "../ui/menu-item";
import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import CreatePostModal from "../ui/post-modal";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../hooks/use.store";
import { removeUser } from "../../features/auth/auth.slice";

export default function LeftBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  function onClick() {
    Cookies.remove("token");
    dispatch(removeUser());
  }

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
          <Image h={50} src="/logo.svg" alt="circle logo" />
        </Box>
        <Flex flexDirection={"column"} gap={2}>
          <ItemMenu route="/" menuIcon="/icons/home.svg" menuTitle="Home" />
          <ItemMenu
            route="/search"
            menuIcon="/icons/user-search.svg"
            menuTitle="Search"
          />
          <ItemMenu
            route="/follows"
            menuIcon="/icons/heart.svg"
            menuTitle="Follows"
          />
          <ItemMenu
            route="/profile"
            menuIcon="/icons/profile-circle.svg"
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
          <button onClick={onClick}>
            <ItemMenu
              route="/login"
              menuIcon="/icons/logout.svg"
              menuTitle="Logout"
            />
          </button>
        </Box>
      </Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <CreatePostModal />
      </Modal>
    </Box>
  );
}
