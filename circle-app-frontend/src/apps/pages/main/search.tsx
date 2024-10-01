import { Flex, Image, Input, Spinner } from "@chakra-ui/react";
import AppLayout from "../../../components/layouts/app-layout";
import StartSearch from "../../../features/search/components/search-start";
import OthersAccountItem from "../../../components/ui/others-account-item";
import { useEffect, useState } from "react";
import { apiV1 } from "../../../libs/api";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface User {
  id: number; // Definisikan properti sesuai struktur data Anda
  fullname: string;
  username: string;
  profilePhoto: string;
  bio: string;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [others, setOther] = useState<User[]>([]); // Gunakan tipe yang sudah didefinisikan
  const {
    register,
    watch,
    setValue, // Menggunakan setValue untuk inisialisasi keyword dari searchParams
  } = useForm();

  const keyword = watch("keyword");

  useEffect(() => {
    const keywordFromParams = searchParams.get("keyword");
    if (keywordFromParams) {
      setValue("keyword", keywordFromParams); // Set initial value untuk keyword
    }
  }, [searchParams, setValue]);

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

  const otherSearch = others.filter((other) =>
    other.fullname.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  );

  if (!others) {
    return <Spinner />;
  }

  return (
    <AppLayout>
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
            onChange={() => setSearchParams({ keyword })} // Update URL saat input berubah
          />
        </Flex>
        {keyword !== "" ? (
          <Flex mt={4} direction={"column"} gap={4}>
            {otherSearch.map((other) => {
              return (
                <OthersAccountItem
                  key={other.id}
                  image={other.profilePhoto}
                  fullName={other.fullname}
                  userName={other.username}
                  bio={other.bio}
                  isFollow="Follow"
                />
              );
            })}
          </Flex>
        ) : (
          <StartSearch />
        )}
      </Flex>
    </AppLayout>
  );
}
