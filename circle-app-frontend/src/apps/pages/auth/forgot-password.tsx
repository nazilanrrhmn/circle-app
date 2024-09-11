import { Box } from "@chakra-ui/react";
import ForgotPasswordForm from "../../../features/auth/components/forgot-password-form";

export default function ForgotPassword() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      marginTop={150}
      paddingX={8}
    >
      <ForgotPasswordForm />
    </Box>
  );
}
