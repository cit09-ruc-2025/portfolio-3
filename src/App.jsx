import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routeUrls } from "./libs/route";
import HomePage from "./pages/home/home-page";
import ProtectedRoutes from "./components/providers/protected-routes";

const router = createBrowserRouter([
  {
    path: routeUrls.homepage,
    element: <HomePage />,
  },
  {
    element: (
      <ProtectedRoutes>
        <Outlet />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: routeUrls.auth, //just example
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
