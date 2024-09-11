import { Box, Image, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../hooks/use-register-form";

export default function RegisterForm() {
  const { handleChange, handleSubmit } = useRegisterForm();

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
        Crate account Circle
      </Text>
      <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
        <Input
          placeholder="Fullname*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
          name="fullName"
          onChange={handleChange}
          type="text"
        />
        <Input
          placeholder="Email*"
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
          placeholder="Password*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
          name="password"
          onChange={handleChange}
          type="password"
        />
        <Button
          backgroundColor={"brand.green"}
          color={"white"}
          fontSize={20}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </FormControl>
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
