import { Box, Image, Text, Input, Button, FormControl } from "@chakra-ui/react";

export default function ResetPasswordForm() {
  return (
    <Box
      color={"white"}
      width={"brand.form"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Image
        src="src/assets/logo.svg"
        alt="Circle Logo"
        boxSize={"150px"}
        marginBottom={-14}
        marginLeft={-4}
      />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Reset password
      </Text>
      <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
        <Input
          type="password"
          placeholder="New Password*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Input
          type="password"
          placeholder="Confirm New Password*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Button backgroundColor={"brand.green"} color={"white"} fontSize={20}>
          Create New Password
        </Button>
      </FormControl>
    </Box>
  );
}
