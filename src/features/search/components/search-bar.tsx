import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";

export default function SearchBar() {
  return (
    <Flex
      backgroundColor={"brand.searchBar"}
      rounded={"full"}
      margin={4}
      padding={"4px 18px"}
      alignItems={"center"}
    >
      <Icon as={RiUserSearchLine} w="24px" h="24px" color="tweet.gray" />
      <Input border={"none"} placeholder="Search your friend" />
    </Flex>
  );
}
