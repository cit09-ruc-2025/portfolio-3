import { SquarePlay } from "lucide-react";
import { Container } from "react-bootstrap";
import { getCookie } from "../../libs/utils/cookie";
import WatchedList from "./components/watched-list";

const WatchedListPage = () => {
  const userId = getCookie("userId");

  return (
    <Container className="mt-3 d-flex flex-column gap-3">
      <div className="d-flex gap-2 align-items-end">
        <SquarePlay />
        <h3 className="m-0">Watched List</h3>
      </div>
      <WatchedList userId={userId} />
    </Container>
  );
};

export default WatchedListPage;
