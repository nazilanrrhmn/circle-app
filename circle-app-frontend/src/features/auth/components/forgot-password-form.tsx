import { Box, Image, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ForgotPasswordForm() {
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
        Forgot password
      </Text>
      <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
        <Input
          type="email"
          placeholder="Email*"
          rounded={8}
          padding={5}
          fontSize={14}
          fontWeight={500}
          borderColor={"brand.borderAbu"}
        />
        <Button backgroundColor={"brand.green"} color={"white"} fontSize={20}>
          Send Intruction
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
