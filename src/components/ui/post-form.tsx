import { Box, Button, Flex, Image, Input, FormControl } from "@chakra-ui/react";

export default function FormPost({
  placeholder,
  buttonTitle,
}: {
  placeholder: string;
  buttonTitle: string;
}) {
  return (
    <FormControl
      display={"flex"}
      alignItems={"center"}
      gap={4}
      justifyContent={"space-between"}
      p={4}
    >
      <Image
        src="src/assets/img/avatar.png"
        alt="thumbnail"
        borderColor={"brand.backgroundBox"}
        height={"40px"}
        rounded={"full"}
        objectFit="cover"
      />
      <Box flex={"1"}>
        <Input variant={"unstyled"} border={"none"} placeholder={placeholder} />
      </Box>
      <Flex alignItems={"center"} gap={4}>
        <Image src="./gallery-add.svg" alt="gallery" height={"24px"} />
        <Button
          backgroundColor={"brand.green-dark"}
          color={"brand.white-dark"}
          height={"33px"}
          justifyItems={"center"}
          rounded={"full"}
          alignItems={"center"}
          padding={4}
          fontSize={"14px"}
          fontWeight={700}
          lineHeight={"17px"}
        >
          {buttonTitle}
        </Button>
      </Flex>
    </FormControl>
  );
}
