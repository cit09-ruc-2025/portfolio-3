import { useState } from "react";
import { Tabs, Tab, Container, Card } from "react-bootstrap";
import LoginForm from "./components/login-form";
import SignupForm from "./components/signup-form";

const AuthPage = () => {
  const [activeKey, setActiveKey] = useState("login");

  return (
    <Container
      className="custom-tab d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <Card
        style={{
          width: "450px",
          padding: "30px 20px",
        }}
      >
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h3 style={{ margin: 0 }}>Welcome</h3>
          <p style={{ margin: 0, color: "var(--secondary)" }}>
            Login or create an account to continue
          </p>
        </div>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          className="mb-3"
          justify
        >
          <Tab eventKey="login" title="Login">
            <LoginForm />
          </Tab>

          <Tab eventKey="signup" title="Sign Up">
            <SignupForm />
          </Tab>
        </Tabs>
      </Card>
    </Container>
  );
};

export default AuthPage;
