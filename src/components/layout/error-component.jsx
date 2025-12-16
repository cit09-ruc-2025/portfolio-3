import { AlertCircle } from "lucide-react";

const ErrorComponent = ({ errorMessage = "An error occured." }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-2"
      style={{ minHeight: "200px" }}
    >
      <AlertCircle />
      {errorMessage}
    </div>
  );
};

export default ErrorComponent;
