import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSignup } from "../../../hooks/queries/auth";

const SignupForm = ({ setActiveKey }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { mutate: signup, isPending } = useSignup();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username?.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length > 100) {
      newErrors.username = "Username cannot exceed 100 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Invalid username";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (formData.email.length > 255) {
      newErrors.email = "Email cannot exceed 255 characters";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length > 12) {
      newErrors.password = "Password cannot exceed 12 characters";
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

    signup(formData, {
      onSuccess: () => {
        setActiveKey("login");
      },
      onError: (error) => {
        setErrors(error?.errors);
      },
    });
  };

  return (
    <Row className="justify-content-center">
      <Form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-2">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors?.email}
            />
            {errors?.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose a username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors?.username}
            />
            {errors?.username && (
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Create a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors?.password}
            />
            {errors?.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>

          <Button type="submit" className="primary-button" disabled={isPending}>
            Create Account
          </Button>
        </div>
      </Form>
    </Row>
  );
};

export default SignupForm;
