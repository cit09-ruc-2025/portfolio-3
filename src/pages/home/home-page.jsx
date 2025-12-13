import BootstrapNavbar from "../../components/layout/navbar";
import TrendingList from "./components/trending-list";

export default function HomePage() {
  return (
    <div className="d-flex flex-column gap-2">
      <BootstrapNavbar />
      <TrendingList />;
    </div>
  );
}
