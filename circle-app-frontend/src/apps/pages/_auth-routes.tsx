import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/use.store";

export default function AuthRoutes() {
  const auth = useAppSelector((state) => state.auth);

  // Cek apakah id ada di entities
  if (!auth.entities || !auth.entities.id) {
    return <Outlet />; // Jika belum login, izinkan akses ke rute
  }

  return <Navigate to="/" />; // Jika sudah login, redirect ke home
}

// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../../hooks/use.store";

// export default function AuthROutes() {
//   const auth = useAppSelector((state) => state.auth.entities);

//   if (!auth.id) {
//     return <Outlet />;
//   }

//   return <Navigate to={"/"} />;
// }
