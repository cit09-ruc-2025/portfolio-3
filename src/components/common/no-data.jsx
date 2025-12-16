import { Search } from "lucide-react";
import { Container } from "react-bootstrap";

const NoData = ({ children }) => {
  return (
    <Container
      className="d-flex flex-column gap-2 align-items-center justify-content-center"
      style={{ minHeight: "300px" }}
    >
      {children}
    </Container>
  );
};

export default NoData;
