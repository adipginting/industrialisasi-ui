import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Header from './Header';

const Home = () => (
  <div>
    <Container fluid='lg'>
      <Row>
        <Col md></Col>
        <Col sm md>
          <Header />
        </Col>
        <Col md>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Home;
