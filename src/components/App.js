import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login, Write, About, Header } from "./";
import { Container, Row, Col, Button } from "react-bootstrap";

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid="lg">
        <Row>
          <Col md></Col>
          <Col md={8}>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Col>
          <Col md></Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
