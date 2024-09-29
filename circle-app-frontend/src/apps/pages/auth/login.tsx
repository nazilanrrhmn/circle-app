import { Box } from "@chakra-ui/react";
import LoginForm from "../../../features/auth/components/login-form";
import { useAppSelector } from "../../../hooks/use.store";

export default function Login() {
  const user = useAppSelector((state) => state.auth.entities);
  console.log(user);

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
