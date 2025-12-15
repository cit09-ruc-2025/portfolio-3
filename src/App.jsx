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
import SearchPage from "./pages/search/search-page";
import Layout from "./components/layout/layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProfilePage from "./pages/profile/profile-page";
import SearchHistoryPage from "./pages/search-history/search-history-page";

const router = createBrowserRouter([
  {
    element: <Layout />,
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
        path: routeUrls.search,
        element: <SearchPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: routeUrls.profile,
        element: <ProfilePage />,
      },
      {
        path: routeUrls.searchHistory,
        element: <SearchHistoryPage />,
      },
    ],
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
