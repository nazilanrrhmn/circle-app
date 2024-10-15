import { Avatar, Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserLogged } from "../../features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/use.store";
import { apiV1 } from "../../libs/api";

interface Account {
  id: number;
  image?: string;
  fullName: string;
  userName?: string;
  bio?: string;
  isFollow: boolean;
}

export default function OthersAccountItem({
  id,
  image,
  fullName,
  userName,
  bio,
  isFollow,
}: Account) {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.auth.entities); // Ambil pengguna yang sedang login dari Redux store
  const [isFollowUser, setIsFollowUser] = useState<boolean>(isFollow);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter jika akun adalah pengguna yang sedang login atau sudah diikuti
  useEffect(() => {
    if (loggedUser?.id === id || isFollow) {
      return; // Jangan tampilkan akun pengguna yang sedang login atau yang sudah diikuti
    }
  }, [loggedUser, id, isFollow]);

  async function onFollow(
    event: React.MouseEvent<HTMLButtonElement>,
    followingId: number
  ) {
    event.preventDefault();

    try {
      let response;
      setIsLoading(true);
      if (isFollowUser) {
        response = await apiV1.delete(`/unfollow/${followingId}`);
        setIsFollowUser(false);
      } else {
        response = await apiV1.post("/follow", { followingId });
        setIsFollowUser(true);
      }
      setIsLoading(false);

      dispatch(getUserLogged()); // Update informasi pengguna yang sedang login setelah follow/unfollow
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
      setIsLoading(false);
    }
  }

  // Jika akun ini adalah pengguna yang sedang login atau sudah diikuti, return null (tidak render)
  if (loggedUser?.id === id || isFollowUser) {
    return null;
  }

  return (
    <Link to={`/profile/${id}`}>
      <Flex gap={2} justifyContent={"space-between"}>
        <Avatar
          src={image}
          name={fullName}
          borderColor={"brand.backgroundBox"}
          height={"40px"}
          width={"40px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Flex direction={"column"} gap={2} width={"100%"}>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text
                fontSize={"14px"}
                mb={1}
                fontWeight={700}
                lineHeight={"16px"}
              >
                {fullName}
              </Text>
              <Text
                fontSize={"14px"}
                fontWeight={400}
                lineHeight={"16px"}
                color={"brand.fontSecondary"}
              >
                @{userName}
              </Text>
            </Box>
            <Button
              onClick={(event) => onFollow(event, id)}
              backgroundColor={"transparent"}
              height={"33px"}
              border={"solid 1px"}
              borderColor={"white"}
              color={"white"}
              rounded={"full"}
              padding={"7px 20px"}
              fontSize={"14px"}
              fontWeight={700}
              isDisabled={isLoading}
            >
              {isLoading ? <Spinner /> : isFollowUser ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
          <Text
            noOfLines={1}
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"20px"}
          >
            {bio}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
