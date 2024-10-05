import {
  Box,
  Flex,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserEntity } from "../../entities/user";
import { useAppSelector } from "../../hooks/use.store";
import { apiV1 } from "../../libs/api";
import OthersAccountItem from "../ui/others-account-item";
import ProfileHeading from "../ui/profile-heading";

export default function RightBar() {
  const user = useAppSelector((state) => state.auth.entities);
  const [others, setOther] = useState<UserEntity[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  async function getThreads() {
    const response = await apiV1.get("/users");
    const data = response.data;
    setIsLoading(false);
    return { data: data };
  }

  useEffect(() => {
    getThreads().then(({ data }) => {
      setOther(data);
    });
  }, []);

  if (!others) {
    return <Spinner />;
  }

  return (
    <Box position={"sticky"} width={"563px"}>
      <Flex
        position={"sticky"}
        top={0}
        gap={"16px"}
        direction={"column"}
        height={"100vh"}
        padding={8}
      >
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"} mb={4}>
            My Profile
          </Text>
          <ProfileHeading
            id={user.id}
            isFollow={user.isFollow}
            isMyProfile={true}
            buttonTitle={"Edit Profile"}
            profilePhoto={user.profilePhoto}
            fullname={user.fullname}
            username={user.username}
            bio={user.bio}
            following={user.followers.length}
            followers={user.following.length}
            thumbnailH="100px"
          />
        </Box>
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"} mb={4}>
            Suggested for you
          </Text>
          {isLoading ? (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          ) : (
            <Flex direction={"column"} gap={4}>
              {others.slice(0, 5).map((other) => {
                return (
                  <OthersAccountItem
                    id={other.id}
                    key={other.id}
                    image={other.profilePhoto}
                    fullName={other.fullname}
                    userName={other.username}
                    isFollow={other.isFollow}
                  />
                );
              })}
            </Flex>
          )}
        </Box>
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Flex gap={1}>
            <Text fontSize={"16px"} fontWeight={700} lineHeight={"20px"} mb={4}>
              <Text as={"span"} fontWeight={400}>
                Developed by
              </Text>{" "}
              Nazila Nur Rohman
            </Text>
            <Text fontSize={"16px"} fontWeight={700} lineHeight={"20px"} mb={4}>
              •
            </Text>
            <Flex gap={1}>
              <a href="https://github.com/nazilanrrhmn" target="_blank">
                <Image h={"20px"} src="/icons/github.svg" alt="circle logo" />
              </a>
              <a href="#" target="_blank">
                <Image h={"20px"} src="/icons/linkedin.svg" alt="circle logo" />
              </a>
              <a href="https://www.instagram.com/nazilnrr/" target="_blank">
                <Image
                  h={"20px"}
                  src="/icons/instagram.svg"
                  alt="circle logo"
                />
              </a>
            </Flex>
          </Flex>
          <Text
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"16px"}
            color={"brand.fontSecondary"}
          >
            Powered by DumbWays Indonesia • #1Coding Bootcamp
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export function RightBarProfile() {
  const [others, setOther] = useState<UserEntity[]>([]);

  async function getThreads() {
    const response = await apiV1.get("/users");
    const data = response.data;
    return { data: data };
  }

  useEffect(() => {
    getThreads().then(({ data }) => {
      setOther(data);
    });
  }, []);

  if (!others) {
    return <Spinner />;
  }

  return (
    <Box position={"sticky"} width={"563px"}>
      <Flex
        position={"sticky"}
        top={0}
        gap={"16px"}
        direction={"column"}
        height={"100vh"}
        padding={8}
      >
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"} mb={4}>
            Suggested for you
          </Text>
          <Flex direction={"column"} gap={4}>
            {others.slice(0, 5).map((other) => {
              return (
                <OthersAccountItem
                  id={other.id}
                  key={other.id}
                  image={other.profilePhoto}
                  fullName={other.fullname}
                  userName={other.username}
                  isFollow={other.isFollow}
                />
              );
            })}
          </Flex>
        </Box>
        <Box
          backgroundColor={"brand.backgroundBox"}
          padding={"12px 20px 20px 20px"}
          rounded={12}
        >
          <Flex gap={1}>
            <Text fontSize={"16px"} fontWeight={700} lineHeight={"20px"} mb={4}>
              <Text as={"span"} fontWeight={400}>
                Developed by
              </Text>{" "}
              Nazila Nur Rohman
            </Text>
            <Text fontSize={"16px"} fontWeight={700} lineHeight={"20px"} mb={4}>
              •
            </Text>
            <Flex gap={1}>
              <a href="https://github.com/nazilanrrhmn" target="_blank">
                <Image h={"20px"} src="/icons/github.svg" alt="circle logo" />
              </a>
              <a href="#" target="_blank">
                <Image h={"20px"} src="/icons/linkedin.svg" alt="circle logo" />
              </a>
              <a href="https://www.instagram.com/nazilnrr/" target="_blank">
                <Image
                  h={"20px"}
                  src="/icons/instagram.svg"
                  alt="circle logo"
                />
              </a>
            </Flex>
          </Flex>
          <Text
            fontSize={"14px"}
            fontWeight={400}
            lineHeight={"16px"}
            color={"brand.fontSecondary"}
          >
            Powered by DumbWays Indonesia • #1Coding Bootcamp
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
