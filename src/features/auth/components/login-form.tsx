import { Box, Image, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/use-login-form";

export default function LoginForm() {
  const { handleChange, handleSubmit } = useLoginForm();

  const buttonStyle = {
    backgroundColor: "brand.green",
    color: "white",
    fontSize: "20px",
  };
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
        marginBottom={-12}
        marginLeft={-4}
      />
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
          name="email"
          onChange={handleChange}
          type="email"
        />
        <Input
          placeholder="Password"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
          name="password"
          onChange={handleChange}
          type="password"
        />
        <Text textAlign={"end"} fontSize={14}>
          <Link to="/forgot-password">Forgot password?</Link>
        </Text>
        <Button sx={buttonStyle} onClick={handleSubmit}>
          Login
        </Button>
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
