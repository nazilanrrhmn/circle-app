import { Box, Image, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const buttonStyle = {
    backgroundColor: "brand.green",
    color: "white",
    fontSize: "20px",
  };
  return (
    <Box color={"white"} width={"brand.form"}>
      <Image src="/logo.svg" alt="Circle Logo" />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Login to Circle
      </Text>
      <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
        <Input
          placeholder="Email/Username*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Input
          placeholder="Password"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Text textAlign={"end"} fontSize={14}>
          Forgot password?
        </Text>
        <Button sx={buttonStyle}>Login</Button>
      </FormControl>
      <Text fontSize={14} marginTop={4}>
        Don't have an account yet?{" "}
        <Text as={"span"} color={"brand.green"}>
          {" "}
          <Link to="/register">Create account!</Link>
        </Text>
      </Text>
    </Box>
  );
}
