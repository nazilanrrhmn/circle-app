import { Box, Image, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/use.store";

export default function ProtectedRoutes() {
  const auth = useAppSelector((state) => state.auth);

  if (auth.loading == "pending") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <Image mb={4} h={50} src="/logo.svg" alt="circle logo" />
          <Spinner h={50} w={50} mt={4} />
        </Box>
      </Box>
    );
  }

  if (auth.entities.id) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  if (auth.loading == "failed") {
    return <Navigate to="login" />;
  }
}
