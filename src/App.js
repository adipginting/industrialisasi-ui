import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
const axios = require('axios').default;


const App = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const postLoginInfo = async (_loginInfo) => {
    try{
      const result = await axios.post('http://localhost:4000/register', _loginInfo);
      console.log(result);
    }
    catch(error){
      console.error(error);
    }
  };

  const sendOnCLick = () => {
     const loginInfo = {"email":email, "username":username, "password":password};
    postLoginInfo(loginInfo);
  };

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
                onChange = {event => { setEmail(event.target.value)}}
              >
            </Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type='username'
                placeholder='username'
                onChange = {event => {setUsername(event.target.value)}}
              >
            </Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label> Password: </Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange= { event => {setPassword(event.target.value)}}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Button type='send' onClick={sendOnCLick()}>Send</Button>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
