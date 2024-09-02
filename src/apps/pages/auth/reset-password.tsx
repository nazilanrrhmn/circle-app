import { Box } from "@chakra-ui/react";
import ResetPasswordForm from "../../../features/auth/components/reset-password-form";

export default function ResetPassword() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      marginTop={150}
      paddingX={8}
    >
      <ResetPasswordForm />
    </Box>
  );
}
