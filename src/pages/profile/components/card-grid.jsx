import React from "react";
import { Row, Col } from "react-bootstrap";

function CardGrid({ columns = 1, children }) {
  const colSize = Math.floor(12 / columns);

  return (
    <Row className="g-3">
      {React.Children.map(children, (child) => (
        <Col md={colSize}>{child}</Col>
      ))}
    </Row>
  );
}

export default CardGrid;
