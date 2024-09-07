import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface menu {
  menuIcon: string;
  menuTitle: string;
  route: string;
}

export default function ItemMenu({ menuIcon, menuTitle, route }: menu) {
  return (
    <Link to={route}>
      <Flex
        align={"center"}
        padding={"12px"}
        rounded={8}
        maxW={"289px"}
        h={"64px"}
      >
        <Image h={"32px"} src={menuIcon} />
        <Text
          marginLeft={4}
          fontSize={"18px"}
          lineHeight={"24px"}
          fontWeight={500}
          color={"white"}
        >
          {menuTitle}
        </Text>
      </Flex>
    </Link>
  );
}
