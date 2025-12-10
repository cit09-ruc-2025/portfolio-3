import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <BootstrapSpinner
      animation="border"
      role="status"
      className="spinner"
    ></BootstrapSpinner>
  );
};

export default Spinner;
