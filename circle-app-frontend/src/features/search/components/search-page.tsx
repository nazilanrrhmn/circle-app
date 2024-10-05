import { Flex, Image, Input, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OthersAccountItem from "../../../components/ui/others-account-item";
import { UserEntity } from "../../../entities/user";
import SearchNoResults from "../../../features/search/components/search-no-result";
import StartSearch from "../../../features/search/components/search-start";
import { apiV1 } from "../../../libs/api";

export default function SearchPage() {
  const [others, setOther] = useState<UserEntity[]>([]);
  const {
    register,
    watch,
    formState: {},
  } = useForm();

  const keyword = watch("keyword");

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

  const otherSearch = others.filter(
    (other) =>
      other.fullname
        .toLocaleLowerCase()
        .includes(keyword.toLocaleLowerCase()) ||
      other.username?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  );

  if (!others) {
    return <Spinner />;
  }
  return (
    <Flex direction={"column"} mt={4} height={"100vh"} p={4}>
      <Flex position={"relative"}>
        <Image
          position={"absolute"}
          zIndex={2}
          top={3}
          left={4}
          src="./search-bar.svg"
          alt="gallery"
          height={"24px"}
        />
        <Input
          {...register("keyword")}
          h={"48px"}
          backgroundColor="brand.searchBar"
          focusBorderColor={"brand.green"}
          alignItems={"center"}
          pl={12}
          rounded={"full"}
          border={"none"}
          placeholder="Search your friend"
        />
      </Flex>
      {(() => {
        if (otherSearch.length !== 0 && keyword !== "") {
          return (
            <Flex mt={4} direction={"column"} gap={4}>
              {otherSearch.map((other) => {
                return (
                  <OthersAccountItem
                    id={other.id}
                    key={other.id}
                    image={other.profilePhoto}
                    fullName={other.fullname}
                    userName={other.username}
                    bio={other.bio}
                    isFollow={other.isFollow}
                  />
                );
              })}
            </Flex>
          );
        } else if (!keyword) {
          return <StartSearch />;
        } else {
          return <SearchNoResults keyword={keyword} />;
        }
      })()}
    </Flex>
  );
}
