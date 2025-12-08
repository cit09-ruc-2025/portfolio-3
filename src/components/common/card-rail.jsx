import Card from "./card";
import { Container, Row, Col } from "react-bootstrap";

const CardRail = ({ items }) => {
  console.log(items.length);
  return (
    <>
      <Container>
        <Row>
          {items.map((i, index) => {
            return (
              <Col xs={6} md={4} key={index}>
                <Card item={i} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default CardRail;
