import { Box, Image, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <Box color={"white"} width={"brand.form"}>
      <Image src="/logo.svg" alt="Circle Logo" />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Crate account Circle
      </Text>
      <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
        <Input
          type="text"
          placeholder="Fullname*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Input
          type="email"
          placeholder="Email*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Input
          type="password"
          placeholder="Password*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Button backgroundColor={"brand.green"} color={"white"} fontSize={20}>
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
