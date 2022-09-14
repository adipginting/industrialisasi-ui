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
  const [isEmailValid, setEmailValidity] = useState(false);
  const [doesEmailExistsonDb, setEmailExistenceOnDb] = useState(false);
  const [isUsernameValid, setUsernameValidity] = useState(false);
  const [doesUsernameExistsonDb, setUsernameExistenceOnDb] = useState(false);
  const {areFieldsValid, setFieldValidiy} = useState(false);

  useEffect(() => {
    const checkEmail = async (_email_) => {
      try {
        if (validator.isEmail(_email_)){
          setEmailValidity(true);
          const { data } = await axios.post('http://localhost:4000/email', {'email':_email_});
          console.log(data);
          if (data){
            setEmailExistenceOnDb(true);
          } else{
            setEmailExistenceOnDb(false);
          }
        } else {
          setEmailValidity(false);
        }
      }
      catch(error){
        console.error(error);
      }
    };

    const delay = setTimeout(() => {
      checkEmail(email); }, 1500);
    return () => {clearTimeout(delay);}
  }, [email, setEmailValidity, setEmailExistenceOnDb]);

  useEffect(() => {
    const checkUsername = async (_username_) => {
      try {
        if (validator.isAlphanumeric(_username_)){
          setUsernameValidity(true);
          const { data } = await axios.post('http://localhost:4000/username', {'username':_username_});
          console.log(data);
          if (data){
            setUsernameExistenceOnDb(data);
          } else{
            setUsernameExistenceOnDb(data);
          }
        } else {
          setUsernameValidity(false);
        }
      }
      catch(error){
        console.error(error);
      }
    };

    const delay = setTimeout(() => {
      checkUsername(username); }, 1500);
    return () => {clearTimeout(delay);}
  }, [username, setUsernameValidity, setUsernameExistenceOnDb]);

  const postLoginInfo = async (_loginInfo) => {
    try{
      await axios.post('http://localhost:4000/register', _loginInfo);
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
        <Col sm md>
          <Form onSubmit={onSubmitHandler}>
            <div className='mt-2 mb-2'><b>Enter your email, username, and password to register.</b></div>
            <Form.Group className='mb-2'>
              <Form.Label> Email*: </Form.Label>
              <Form.Control
                type='email'
                placeholder='email'
                onChange = {emailHandler}
                value = {email}
              >
            </Form.Control>
            {isEmailValid === false && email.length > 5 && <div className='warning'> This is not a valid email. </div> }
            {doesEmailExistsonDb && <div className='warning'>The email has been registered. </div>}
            {doesEmailExistsonDb === false && isEmailValid && <div className='go'>The email is valid. </div>}
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Username*: </Form.Label>
              <Form.Control
                type='username'
                placeholder='username'
                onChange = {usernameHandler}
                value = {username}
              >
            </Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label> Password*: </Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange= {passwordHandler}
                value = {password}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label> Repeat password*: </Form.Label>
              <Form.Control
                type='password'
                placeholder='Repeat password'
                onChange= {passwordRepeatHandler}
                value = {passwordRepeat}
              ></Form.Control>
              { (isPasswordRepeated() === false) && <div className='warning'>Your password do not match!</div> }
            </Form.Group>
          <Form.Label>*) Required.</Form.Label><br/>
          <Button type='submit'>Submit</Button>
          </Form>
        </Col>
        <Col sm md></Col>
      </Row>
    </Container>
  );
}

export default Register;
