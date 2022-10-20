import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Header from './Header';
import { getJwt } from '../api'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const checkIfLoggedIn = async () => {
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
          <Col sm md>
            <Header user={loggedInUser} recentlyLoggedIn={false}/>
            <div className='content'>
              <h1>Welcome to Industrialisasi </h1>
              <p>Welcome to this blog. </p>
              <p> This blog is still under construction. You can track the progress on these two Github repositories for the <a href='https://github.com/adipginting/industrialisasi-apis'>apis</a> and for the <a href='https://github.com/adipginting/industrialisasi-interface'>interface/views</a>.</p>
              <p> Regards, Adi Ginting. </p>
            </div>
          </Col>
          <Col md>
          </Col>
        </Row>
      </Container>
    </div>
)};

export default Home;
