import { Box, Flex, Image, Button } from "@chakra-ui/react";
import ItemMenu from "../ui/menu-item";
import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import CreatePostModal from "../ui/post-modal";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../hooks/use.store";
import { removeUser } from "../../features/auth/auth.slice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LeftBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onClick() {
    Swal.fire({
      icon: "question",
      title: "Are you sure want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      background: "#1D1D1D",
      color: "#fff",
      iconColor: "#04A51E",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        dispatch(removeUser());
        navigate("/login");
      }
    });
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
        <CreatePostModal onClose={onClose} />
      </Modal>
    </Box>
  );
}
