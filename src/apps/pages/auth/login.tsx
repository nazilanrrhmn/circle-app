import { Box } from "@chakra-ui/react";
import LoginForm from "../../../features/auth/components/login-form";

export default function Login() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      marginTop={150}
    >
      <LoginForm />
    </Box>
  );
}
