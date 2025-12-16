import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <main className="my-3">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
