import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
const axios = require('axios').default;


const App = () => {
  const {email, setEmail} = useState('');
  const postEmail = (async (event) => {
    try{
      const result = await axios.post('http://localhost:4000', email);
      console.log(result);
    }
    catch(error){
      console.error(error);
    }
    event.preventDefault();
  })();
  return (
    <Container fluid='lg'>
      <Row>
        <Col>
          <Form>
            <div className='mt-2 mb-2'><b>Enter your email, username, and password to register.</b></div>
            <Form.Group className='mb-2'>
              <Form.Label> Email: </Form.Label>
              <Form.Control
                type='email'
                placeholder='email'
                onChange = {event => {setEmail(event.target.value)}}
              >
            </Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Username: </Form.Label>
              <Form.Control type='username' placeholder='username'></Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label> Password: </Form.Label>
              <Form.Control type='password' placeholder='Password'></Form.Control>
            </Form.Group>
          </Form>
          <Button type='send' onClick={event => postEmail(event)}>Send</Button>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
