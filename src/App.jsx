import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routeUrls } from "./libs/route";
import HomePage from "./pages/home/home-page";
import ProtectedRoutes from "./components/providers/protected-routes";
import QueryClientProvider from "./context/query-client-provider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import MediaDetailPage from "./pages/media-detail/media-detail-page";
import AuthPage from "./pages/auth/auth-page";
import PublicRoutes from "./components/providers/public-routes";
import MainLayout from "./components/layout/main-layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
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
          <PublicRoutes>
            <Outlet />
          </PublicRoutes>
        ),
        children: [
          {
            path: routeUrls.auth,
            element: <AuthPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
