import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/use-login-form";

export default function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useLoginForm();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email/Username*"
            rounded={8}
            padding={5}
            fontSize={14}
            fontWeight={500}
            borderColor={"brand.borderAbu"}
          />
          {errors.email && (
            <Text fontSize={13} color={"red"}>
              * {errors.email.message}
            </Text>
          )}
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password"
            rounded={8}
            padding={5}
            fontSize={14}
            fontWeight={500}
            borderColor={"brand.borderAbu"}
          />
          {errors.password && (
            <Text fontSize={13} color={"red"}>
              * {errors.password.message}
            </Text>
          )}
          <Link to="/forgot-password">
            <Text textAlign={"end"} fontSize={14}>
              Forgot password?
            </Text>
          </Link>
          <Button type="submit" sx={buttonStyle} disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Login"}
          </Button>
        </FormControl>
      </form>
      <Text fontSize={14} marginTop={4}>
        Don't have an account yet?{" "}
        <Text as={"span"} color={"brand.green"}>
          {" "}
          <Link to="/register">Create account</Link>
        </Text>
      </Text>
    </Box>
  );
}
