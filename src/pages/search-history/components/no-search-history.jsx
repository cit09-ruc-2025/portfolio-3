import { Search } from "lucide-react";
import { Container } from "react-bootstrap";

const NoSearchHistory = () => {
  return (
    <Container
      className="d-flex flex-column gap-2 align-items-center justify-content-center"
      style={{ minHeight: "300px" }}
    >
      <Search size="30" opacity="0.5" />
      <p className="m-0 fw-semibold">No Search History found</p>
    </Container>
  );
};

export default NoSearchHistory;
