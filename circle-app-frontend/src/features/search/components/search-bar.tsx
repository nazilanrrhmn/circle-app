import { Flex, Input, Image } from "@chakra-ui/react";

export default function SearchBar() {
  return (
    <Flex position={"relative"}>
      <Image
        position={"absolute"}
        zIndex={2}
        top={3}
        left={4}
        src="/search-bar.svg"
        alt="gallery"
        height={"24px"}
      />
      <Input
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
  );
}
