import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useLogin } from "../../../hooks/queries/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: login, isPending } = useLogin();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setErrorMessage("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username?.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password?.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    login(formData, {
      onSuccess: (data) => {},
      onError: (error) => {
        setErrorMessage(error?.message || "Login failed. Please try again.");
      },
    });
  };

  return (
    <Row className="justify-content-center">
      <Form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-2">
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            {errors.username && (
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            {errors.username && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>

          <Button
            type="submit"
            className="mt-2 primary-button"
            disabled={isPending}
          >
            Login
          </Button>
        </div>
      </Form>
    </Row>
  );
};

export default LoginForm;
