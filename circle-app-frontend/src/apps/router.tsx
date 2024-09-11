import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Home from "./pages/home";
import Search from "./pages/search";
import Follows from "./pages/folows";
import Profile from "./pages/profile";
import DetailPost from "./pages/detail-post";
import DetailImage from "./pages/detail-image";

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/follows" element={<Follows />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail-post" element={<DetailPost />} />
        <Route path="/detail-image" element={<DetailImage />} />
      </Routes>
    </BrowserRouter>
  );
}
