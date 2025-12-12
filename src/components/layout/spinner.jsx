import { Spinner as BootstrapSpinner, Container } from "react-bootstrap";

const Spinner = ({ height, width }) => {
  return (
    <Container
      fluid
      className="p-0 d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <BootstrapSpinner
        animation="border"
        role="status"
        className="spinner"
        style={{ height, width }}
      ></BootstrapSpinner>
    </Container>
  );
};

export default Spinner;
