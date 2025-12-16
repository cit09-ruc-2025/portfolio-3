import { Navigate } from "react-router-dom";
import { getCookie } from "../../libs/utils/cookie";
import { routeUrls } from "../../libs/route";

const ProtectedRoutes = ({ children }) => {
  const token = getCookie("token");

  if (!token) {
    return <Navigate to={routeUrls.auth} replace />;
  }
  return children;
};

export default ProtectedRoutes;
