import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Header from './Header';
import { getJwt } from '../api'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      console.log('JwT result is ' + await getJwt())
      if(await getJwt() !== 'no'){
        setLoggedInUser(await getJwt());
      } else {
        setLoggedInUser('no');
      }
    };
    checkIfLoggedIn();
  }, [setLoggedInUser]);

  return (
    <div>
      <Container fluid='lg'>
        <Row>
          <Col md></Col>
          <Col sm md>
            <Header user={loggedInUser} />
          </Col>
          <Col md>
          </Col>
        </Row>
      </Container>
    </div>
)};

export default Home;
