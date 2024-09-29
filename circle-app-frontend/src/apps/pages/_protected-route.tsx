import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/use.store";

export default function ProtectedRoutes() {
  const auth = useAppSelector((state) => state.auth);
  console.log("logged user", auth);

  if (auth.loading == "pending") {
    return <p>Loading ...</p>;
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
