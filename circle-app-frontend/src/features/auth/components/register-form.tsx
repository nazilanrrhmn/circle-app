import { Box, Image, Text, Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInput, registerSchema } from "../schemas/register";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: object) {
    console.log(data);
  }

  return (
    <Box color={"white"} width={"brand.form"}>
      <Image src="/logo.svg" alt="Circle Logo" />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Crate account Circle
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
          <Input
            {...register("fullName")}
            type="text"
            placeholder="Fullname*"
            rounded={8}
            padding={5}
            fontSize={14}
            fontWeight={500}
            borderColor={"brand.borderAbu"}
          />
          {errors.fullName && (
            <Text fontSize={13} color={"red"}>
              * {errors.fullName.message}
            </Text>
          )}
          <Input
            {...register("email")}
            type="email"
            placeholder="Email*"
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
            type="password"
            placeholder="Password*"
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
          <Button
            type="submit"
            backgroundColor={"brand.green"}
            color={"white"}
            fontSize={20}
          >
            Create
          </Button>
        </Box>
      </form>
      <Text fontSize={14} marginTop={4}>
        Already have account?{" "}
        <Text as={"span"} color={"brand.green"}>
          {" "}
          <Link to="/login"> Login</Link>
        </Text>
      </Text>
    </Box>
  );
}
