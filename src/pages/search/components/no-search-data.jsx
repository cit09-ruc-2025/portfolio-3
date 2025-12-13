import { Search } from "lucide-react";
import { Container } from "react-bootstrap";

const NoSearchData = () => {
  return (
    <Container
      className="d-flex flex-column gap-2 align-items-center justify-content-center"
      style={{ minHeight: "300px" }}
    >
      <Search size="30" opacity="0.5" />
      <p className="m-0 fw-semibold">No results found</p>
      <p className="m-0">Try searching for something else</p>
    </Container>
  );
};

export default NoSearchData;
