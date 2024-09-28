import { Box, Image, Text, Input, Button, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../hooks/use-register-form";

export default function RegisterForm() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useRegisterForm();

  return (
    <Box color={"white"} width={"brand.form"}>
      <Image src="/logo.svg" alt="Circle Logo" />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Crate account Circle
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
          <Input
            {...register("fullname")}
            type="text"
            placeholder="Fullname*"
            rounded={8}
            padding={5}
            fontSize={14}
            fontWeight={500}
            borderColor={"brand.borderAbu"}
          />
          {errors.fullname && (
            <Text fontSize={13} color={"red"}>
              * {errors.fullname.message}
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
            {isSubmitting ? <Spinner /> : "Create"}
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
      {/* <Button onClick={() => dispatch(fetchUserLogged())} backgroundColor={"brand.green"} color={"white"} fontSize={20}>
        Fetch
      </Button> */}
    </Box>
  );
}
