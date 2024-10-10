import { Avatar, Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserLogged } from "../../features/auth/auth.slice";
import { useAppDispatch } from "../../hooks/use.store";
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
  const [isFollowUser, setIsFollowUser] = useState<boolean>(isFollow);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onFollow(
    event: React.MouseEvent<HTMLButtonElement>,
    followingId: number
  ) {
    event.preventDefault();

    try {
      let response;
      if (isFollowUser) {
        setIsLoading(true);
        response = await apiV1.delete(`/unfollow/${followingId}`);
        setIsLoading(false);
        setIsFollowUser(false);
      } else {
        setIsLoading(true);
        response = await apiV1.post("/follow", { followingId });
        setIsLoading(false);
        setIsFollowUser(true);
      }

      dispatch(getUserLogged());
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
