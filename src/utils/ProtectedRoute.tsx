import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export const AdminProtectedRoute = () => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);
  if (!accessToken) {
    return null;
  }

  return <Outlet />;
};

export const SuperAdminProtectedRoute = () => {
  const { accessToken, currentUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || currentUser?.role !== "super_admin") {
      navigate("/");
    }
  }, [accessToken, currentUser, navigate]);
  if (!accessToken || currentUser?.role !== "super_admin") {
    return null;
  }

  return <Outlet />;
};
