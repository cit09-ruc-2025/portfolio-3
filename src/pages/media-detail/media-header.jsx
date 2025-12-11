import { Star } from "lucide-react";
import { Badge, Col, Container } from "react-bootstrap";

const MediaHeader = ({ title, averageRating }) => {
  return (
    <Col
      style={{ minHeight: "80vh", background: "var(--secondary)" }}
      className="d-flex align-items-end text-white m-0"
    >
      <Container className="align-items-end pb-2">
        <h1>{title}</h1>
        <div className="d-flex gap-2 align-items-start">
          <Badge
            bg="dark"
            style={{
              width: "fit-content",
              opacity: "0.8",
            }}
          >
            <div className="d-flex align-items-center gap-1 px-2">
              <Star size="16px" className="text-warning" />
              {parseFloat(averageRating ?? 0).toFixed(1)}
            </div>
          </Badge>
        </div>
      </Container>
    </Col>
  );
};

export default MediaHeader;
