import { Heart, History } from "lucide-react";
import { Container } from "react-bootstrap";
import RecentlyViewedList from "./components/recently-viewed-list";

const RecentlyViewedPage = () => {
  return (
    <Container className="mt-3 d-flex flex-column gap-3">
      <div className="d-flex gap-2 align-items-end">
        <History />
        <h3 className="m-0">Recently Viewed</h3>
      </div>
      <RecentlyViewedList />
    </Container>
  );
};

export default RecentlyViewedPage;
