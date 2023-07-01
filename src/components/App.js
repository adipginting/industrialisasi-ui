import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login, Write, About, Header } from "./";
import { Container, Row, Col } from "react-bootstrap";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Container fluid="lg">
          <Row>
            <Col md></Col>
            <Col md={6}>
              <Header />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/write" element={<Write />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Col>
            <Col md></Col>
          </Row>
        </Container>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
