import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routeUrls } from "./libs/route";
import HomePage from "./pages/home/home-page";
import ProtectedRoutes from "./components/providers/protected-routes";
import QueryClientProvider from "./context/query-client-provider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import MediaDetailPage from "./pages/media-detail/media-detail-page";
import AuthPage from "./pages/auth/auth-page";

const router = createBrowserRouter([
  {
    path: routeUrls.homepage,
    element: <HomePage />,
  },
  {
    path: routeUrls.media,
    element: <MediaDetailPage />,
  },
  {
    element: (
      <ProtectedRoutes>
        <Outlet />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: routeUrls.auth,
        element: <AuthPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
