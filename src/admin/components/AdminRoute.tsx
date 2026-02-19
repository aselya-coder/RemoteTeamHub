import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminRoute() {
  const authed = typeof localStorage !== "undefined" && localStorage.getItem("admin_auth") === "true";
  const location = useLocation();
  if (!authed) return <Navigate to="/admin" state={{ from: location }} replace />;
  return <Outlet />;
}

