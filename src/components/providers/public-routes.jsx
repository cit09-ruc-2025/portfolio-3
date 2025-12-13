import { Navigate } from "react-router-dom";
import { getCookie } from "../../libs/utils/cookie";
import { routeUrls } from "../../libs/route";

const PublicRoutes = ({ children }) => {
  const token = getCookie("token");

  if (token) {
    return <Navigate to={routeUrls.homepage} replace />;
  }
  return children;
};

export default PublicRoutes;
