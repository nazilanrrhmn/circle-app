import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/use.store";
import { Spinner } from "@chakra-ui/react";

export default function ProtectedRoutes() {
  const auth = useAppSelector((state) => state.auth);

  if (auth.loading == "pending") {
    return <Spinner />;
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
