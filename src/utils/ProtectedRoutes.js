import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hook/useAuthContext";

const ProtectedRoutes = () => {
  const { user } = useAuthContext()

  return !user ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoutes