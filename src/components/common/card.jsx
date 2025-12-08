import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Card = ({ item }) => {
  const { PathUrl, Title, Description } = item;
  return (
    <Col xs={6} md={4}>
      <Image src={PathUrl} rounded />
      <h2>{Title}</h2>
      <p>{Description}</p>
    </Col>
  );
};

export default Card;
