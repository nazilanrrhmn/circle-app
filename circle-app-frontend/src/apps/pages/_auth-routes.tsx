import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/use.store";
// import ProtectedRoutes from "./_protected-route";

export default function AuthROutes() {
  const auth = useAppSelector((state) => state.auth.entities);

  if (!auth.id) {
    return <Outlet />;
  }

  return <Navigate to={"/"} />;
}
