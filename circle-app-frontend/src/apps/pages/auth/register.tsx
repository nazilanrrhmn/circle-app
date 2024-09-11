import { Box } from "@chakra-ui/react";
import RegisterForm from "../../../features/auth/components/register-form";

export default function Register() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      marginTop={150}
      paddingX={8}
    >
      <RegisterForm />
    </Box>
  );
}
