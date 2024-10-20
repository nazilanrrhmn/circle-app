import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getUserLogged } from "../features/auth/auth.slice";
import { useAppDispatch } from "../hooks/use.store";
import AuthROutes from "./pages/_auth-routes";
import ProtectedRoutes from "./pages/_protected-route";
import ForgotPassword from "./pages/auth/forgot-password";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ResetPassword from "./pages/auth/reset-password";
import DetailImage from "./pages/main/detail-image";
import DetailPost from "./pages/main/detail-post";
import Follows from "./pages/main/follows";
import Home from "./pages/main/home";
import MyProfile from "./pages/main/profile";
import Profile from "./pages/main/others-profile";
import Search from "./pages/main/search";

export default function RouterApp() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  const router = createBrowserRouter([
    {
      element: <AuthROutes />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password/:token",
          element: <ResetPassword />,
        },
      ],
    },

    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/follows",
          element: <Follows />,
        },
        {
          path: "/profile",
          element: <MyProfile />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/detail-post/:id",
          element: <DetailPost />,
        },
        {
          path: "/detail-image/:id",
          element: <DetailImage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

// return (
//   <BrowserRouter>
//     <Routes>
//       {/* auth */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//       {/* pages */}
//       <Route path="/" element={<Home />} />
//       <Route path="/search" element={<Search />} />
//       <Route path="/follows" element={<Follows />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/detail-post" element={<DetailPost />} />
//       <Route path="/detail-image" element={<DetailImage />} />
//     </Routes>
//   </BrowserRouter>
// );
