import React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import validator from "validator";
import PasswordStrengthIndicator from "react-password-strength-bar";
import { api } from "../api";
import Header from './Header';

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [verifier, setVerifier] = useState("");
  const [isVerifierCodeValid, setVerifierCodeValidy] = useState(false);
  const [hasVerifierCodeTimedout, setVerifierCodeTimedout] = useState(false);
  const [isEmailValid, setEmailValidity] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false);
  const [doesEmailExistsonDb, setEmailExistenceOnDb] = useState(false);
  const [isUsernameValid, setUsernameValidity] = useState(false);
  const [doesUsernameExistsonDb, setUsernameExistenceOnDb] = useState(false);

  //fetch email
  useEffect(() => {
    const checkEmail = async (_email_) => {
      try {
        if (validator.isEmail(_email_)) {
          setEmailValidity(true);
          const { data } = await api.post("/email", {
            email: _email_,
          });
          console.log("Does " + _email_ + " exist on database? " + data);
          if (data === true) {
            setEmailExistenceOnDb(true);
          } else {
            setEmailExistenceOnDb(false);
          }
        } else {
          setEmailValidity(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const delay = setTimeout(() => {
      checkEmail(email);
    }, 500);
    return () => {
      clearTimeout(delay);
    };
  }, [email, setEmailValidity, setEmailExistenceOnDb]);

  useEffect(() => {
    const checkUsername = async (_username_) => {
      try {
        if (validator.isAlphanumeric(_username_) && _username_.length > 3) {
          setUsernameValidity(true);
          const { data } = await api.post("/username", {
            username: _username_,
          });
          console.log("Does " + _username_ + " exist on database? " + data);
          if (data === true) {
            setUsernameExistenceOnDb(true);
          } else {
            setUsernameExistenceOnDb(false);
          }
        } else if (validator.isAlphanumeric(_username_) === false) {
          setUsernameValidity(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const delay = setTimeout(() => {
      checkUsername(username);
    }, 500);
    return () => {
      clearTimeout(delay);
    };
  }, [username, setUsernameValidity, setUsernameExistenceOnDb]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isEmailSent === true) {
        setVerifierCodeTimedout(true);
      }
    }, 300000);

    return () => {
      clearTimeout(delay);
    };
  }, [isEmailSent, setVerifierCodeTimedout]);

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

  const verifierHandler = (event) => {
    setVerifier(event.target.value);
    event.preventDefault();
  };

  const isPasswordValid = () => {
    if (password.length > 6) return true;
    return false;
  };

  const isPasswordRepeatValid = () => {
    if (passwordRepeat.length > 6) return true;
    return false;
  };

  const onSubmitHandler = (event) => {
    const postLoginInfo = async (_loginInfo_) => {
      try {
        await api.post("/register", _loginInfo_);
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async () => {
      if (
        email === "" ||
        username === "" ||
        password === "" ||
        passwordRepeat === ""
      ) {
        alert("Please fill all of the fields before submitting.");
        event.preventDefault();
      } else if (areRegistrationFieldsValid()) {
        const loginInfo = {
          email: email,
          username: username,
          password: password,
        };
        await postLoginInfo(loginInfo);
        setEmail("");
        setEmailValidity(false);
        setUsername("");
        setUsernameValidity(false);
        setPassword("");
        setPasswordRepeat("");
        event.preventDefault();
      } else if (areRegistrationFieldsValid() === false) {
        alert("Please conform to the warnings and errors before submitting.");
        event.preventDefault();
      }
    };

    onSubmit(); //call onsubmit function which is an async function.
  };

  const isPasswordRepeated = () => {
    if (password === passwordRepeat) return true;
    return false;
  };

  const areRegistrationFieldsValid = () => {
    if (
      isEmailValid &&
      doesEmailExistsonDb === false &&
      isUsernameValid &&
      doesUsernameExistsonDb === false &&
      isPasswordValid() &&
      isPasswordRepeatValid() &&
      isPasswordRepeated()
    )
      return true;
    return false;
  };

  const emailSubmitHandler = (event) => {
    const sendVerificationCodeEmail = async () => {
      const { data } = await api.post("/sendemail", {
        email: email,
      });

      console.log("Was email send? " + data);

      if (isEmailValid && doesEmailExistsonDb === false) {
        if (data === true) {
          setEmailSent(true);
        } else {
          setEmailSent(false);
        }
      }
    };
    sendVerificationCodeEmail();
    event.preventDefault();
  };

  const submitVerifierCode = (event) => {
    const checkVerifierCode = async () => {
      if (
        validator.isAlphanumeric(verifier) &&
        hasVerifierCodeTimedout === false
      ) {
        const { data } = await api.post("/verifier", {
          email: email,
          code: verifier,
        });
        console.log("Is verifier valid? " + data);
        if (data === true) {
          setVerifierCodeValidy(true);
        } else {
          setVerifierCodeValidy(false);
        }
      }
    };
    checkVerifierCode();
    event.preventDefault();
  };

  return (
    <Container fluid="lg">
      <Row>
        <Col md></Col>
        <Col sm md>
          <Header />
          {isEmailSent === false && (
            <Form onSubmit={emailSubmitHandler}>
              <h5 className="mt-2">Industrialisasi registration. </h5>
              <div className="mb-2">
                <strong>Please enter your email. </strong>
              </div>
              <Form.Group className="mb-2">
                <Form.Label> Email: </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  onChange={emailHandler}
                  value={email}
                ></Form.Control>
                {isEmailValid === false && email !== "" && (
                  <div className="assist"><span role="img" aria-label="warning">⚠️ </span>Please use a real email. </div>
                )}
                {doesEmailExistsonDb && (
                  <div className="assist">
                    <span role="img" aria-label="error">❌</span> This email has been registered. Please use another email.
                  </div>
                )}
                {doesEmailExistsonDb === false && isEmailValid && (
                  <div className="go"><span role="img" aria-label="correct">✔️ </span>Email looks good. </div>
                )}
                <Button type="submit" className="mt-2">
                  Submit Email
                </Button>
              </Form.Group>
            </Form>
          )}
          {isEmailSent === true && isVerifierCodeValid === false && (
            <Form onSubmit={submitVerifierCode}>
              <p className="mt-2">
                <h5>Industrialisasi registration. </h5>
              </p>
              <div className="mb-2">
                <strong>
                  Please check <span className="go">{email}'s </span> inbox/spam
                  folder, a six character code has been sent to your email.{" "}
                </strong>
              </div>
              <Form.Group className="mb-2">
                <Form.Label> Six character verifier code: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="verifier code"
                  onChange={verifierHandler}
                  value={verifier}
                ></Form.Control>
                {isVerifierCodeValid === false &&
                  verifier !== "" &&
                  verifier.length < 6 && (
                    <div className="assist">
                      <span role="img" aria-label="warning">⚠️ </span>The Verifier code consists of six character of numbers
                      and letters.{" "}
                    </div>
                  )}
                {hasVerifierCodeTimedout === true && (
                  <div className="assist">
                    <span role="img" aria-label="error">❌</span> Timeout. The code is no longer valid. Refresh the page to
                    try again.
                  </div>
                )}

                <Button type="submit" className="mt-2">
                  Submit code
                </Button>
              </Form.Group>
            </Form>
          )}
          {isVerifierCodeValid === true && (
            <Form onSubmit={onSubmitHandler}>
              <h5 className="mt-2">Industrialisasi registration. </h5>
              <div className="mb-2">
                <strong>Please enter your username and password. </strong>
              </div>
              <Form.Group className="mb-2">
                <Form.Label>Username*: </Form.Label>
                <Form.Control
                  type="username"
                  placeholder="username"
                  onChange={usernameHandler}
                  value={username}
                ></Form.Control>
                {isUsernameValid === false && username !== "" && (
                  <div className="assist">
                    <span role="img" aria-label="warning">⚠️ </span> Username has to be consisted of only alphabets and
                    numbers.
                  </div>
                )}
                {username.length <= 3 && username !== "" && (
                  <div className="assist">
                    <span role="img" aria-label="warning">⚠️ </span> Username has to be more than 3 characters long.
                  </div>
                )}

                {doesUsernameExistsonDb && (
                  <div className="assist">
                    <span role="img" aria-label="error"> ❌</span> Unfortunately, the username had been taken. Please,
                    choose another username.
                  </div>
                )}
                {doesUsernameExistsonDb === false && isUsernameValid && (
                  <div className="go"><span role="img" aria-label="correct">✔️</span> Username looks good. </div>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label> Password*: </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={passwordHandler}
                  value={password}
                ></Form.Control>
                {isPasswordValid() && (
                  <PasswordStrengthIndicator password={password} />
                )}
                {isPasswordValid() === false && password !== "" && (
                  <div className="assist">
                    <span role="img" aria-label="warning">⚠️ </span>Password must be more than six characters.
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label> Repeat password*: </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat password"
                  onChange={passwordRepeatHandler}
                  value={passwordRepeat}
                ></Form.Control>
                {isPasswordRepeatValid() && (
                  <PasswordStrengthIndicator password={passwordRepeat} />
                )}
                {isPasswordRepeatValid() === false && passwordRepeat !== "" && (
                  <div className="assist">
                    <span role="img" aria-label="warning">⚠️ </span> Password must be more than six characters.
                  </div>
                )}
                {isPasswordRepeated() === false && passwordRepeat !== "" && (
                  <div className="assist"><span role="img" aria-label="warning">⚠️ </span> Passwords don't match. </div>
                )}
                {isPasswordRepeatValid() &&
                  isPasswordValid() &&
                  isPasswordRepeated() === true &&
                  passwordRepeat !== "" && (
                    <div className="go"><span role="img" aria-label="correct">✔️ </span> Passwords match!</div>
                  )}
              </Form.Group>
              <Form.Label>
                <div>*) Required.</div>
              </Form.Label>
              <br />
              <Button type="submit">Create Account</Button>
            </Form>
          )}
        </Col>
        <Col sm md></Col>
      </Row>
    </Container>
  );
};
export default Register;
