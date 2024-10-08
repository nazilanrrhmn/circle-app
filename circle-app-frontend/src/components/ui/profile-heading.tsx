import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { UserProfileDTO } from "../../features/profile/types/profile.dto";
import { apiV1 } from "../../libs/api";
import EditProfileModal from "./profile-modal";

export default function ProfileHeading({
  id,
  thumbnailH,
  fullname,
  username,
  bio,
  profilePhoto,
  following,
  followers,
  isFollow,
  isMyProfile,
}: UserProfileDTO & {
  thumbnailH: string;
  buttonTitle: string;
  isFollow: boolean;
  isMyProfile?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFollowUser, setIsFollowUser] = useState<boolean>(isFollow);
  console.log("isFollow", isFollow);
  console.log("isFollowUser", isFollowUser);

  async function onFollow(followingId: number) {
    try {
      let response;
      if (isFollowUser) {
        response = await apiV1.delete(`/unfollow/${followingId}`);
        setIsFollowUser(false);
      } else {
        response = await apiV1.post("/follow", { followingId });
        setIsFollowUser(true);
      }
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 800,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box position={"relative"} marginBottom={4}>
        <Image
          src="/img/cover.png"
          alt="thumbnail"
          height={thumbnailH}
          width={"100%"}
          rounded={8}
          objectFit="cover"
        />
        <Avatar
          src={profilePhoto}
          name={fullname}
          border={"solid 4px"}
          borderColor={"brand.backgroundBox"}
          position={"absolute"}
          bottom={"0px"}
          left={"14px"}
          height={"80px"}
          width={"80px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Flex justifyContent={"flex-end"} marginTop={2}>
          <Button
            onClick={isMyProfile ? onOpen : () => onFollow(id)}
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
            {isMyProfile
              ? "Edit Profile"
              : isFollowUser
              ? "Unfollow"
              : "Follow"}
          </Button>
        </Flex>
      </Box>
      <Flex direction={"column"} gap={2}>
        <Text as={"h1"} fontSize={"24px"} fontWeight={700} lineHeight={"32px"}>
          {fullname}
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"brand.fontSecondary"}
        >
          @{username}
        </Text>
        <Text fontSize={"16px"} fontWeight={400} lineHeight={"24px"}>
          {bio}
        </Text>
        <Flex gap={4}>
          <Text fontSize={"16px"} fontWeight={700} lineHeight={"24px"}>
            {following}{" "}
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
            {followers}{" "}
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
        <EditProfileModal
          profilePhoto={profilePhoto}
          thumbnailH={thumbnailH}
          fullname={fullname}
          onClose={onClose} // Pass the onClose function here
        />
      </Modal>
    </>
  );
}
