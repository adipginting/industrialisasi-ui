import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './custom.css' ;
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import validator from 'validator';

const axios = require('axios');

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [doesEmailExistonDb, setEmailExistonDb] = useState(false);
  const [emailErrors, setEmailErrors] = useState([""]);

  useEffect(() => {
    const delay = setTimeout(() => {
      checkEmail(email); }, 2000);
    return () => {clearTimeout(delay);}
  }, [email]);

  const postLoginInfo = async (_loginInfo) => {
    try{
      await axios.post('http://localhost:4000/register', _loginInfo);
    }
    catch(error){
      console.error(error);
    }
  };

  const checkEmail = async (_email) => {
    try {
      const {data, ...rest} = await axios.post('http://localhost:4000/email', {'email':_email});
      console.log(data);
      if (data === true){

      } else{
        setEmailExistonDb(false);
      }
    }
    catch(error){
      console.error(error);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    event.preventDefault();
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
    event.preventDefault();
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    event.preventDefault();
  };

  const passwordRepeatHandler = (event) => {
    setPasswordRepeat(event.target.value);
    event.preventDefault();
  };

  const onSubmitHandler = (event) => {
    if (isPasswordRepeated()){
      const loginInfo = {"email":email, "username":username, "password":password};
      postLoginInfo(loginInfo);
      setEmail('');
      setUsername('');
      setPassword('');
      setPasswordRepeat('');
      event.preventDefault();
    } else {
      alert("Please fix the errors before submitting.");
      event.preventDefault();
    }
  };

  const isPasswordRepeated = () => {
    if (password === passwordRepeat)
      return true;
    return false;
  };


  return (
    <Container fluid='lg'>
      <Row>
        <Col md></Col>
        <Col md>
          <Form onSubmit={onSubmitHandler}>
            <div className='mt-2 mb-2'><b>Enter your email, username, and password to register.</b></div>
            <Form.Group className='mb-2'>
              <Form.Label> Email: </Form.Label>
              <Form.Control
                type='email'
                placeholder='email'
                onChange = {emailHandler}
                value = {email}
              >
            </Form.Control>
            {doesEmailExistonDb && <div className='warning'>This email is unavailable. Please use another email. </div>}
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type='username'
                placeholder='username'
                onChange = {usernameHandler}
                value = {username}
              >
            </Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label> Password: </Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange= {passwordHandler}
                value = {password}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label> Repeat password: </Form.Label>
              <Form.Control
                type='password'
                placeholder='Repeat password'
                onChange= {passwordRepeatHandler}
                value = {passwordRepeat}
              ></Form.Control>
              { (isPasswordRepeated() === false) && <div className='warning'>Your password do not match!</div> }
            </Form.Group>

          <Button type='submit'>Submit</Button>
          </Form>
        </Col>
        <Col md></Col>
      </Row>
    </Container>
  );
}

export default Register;
