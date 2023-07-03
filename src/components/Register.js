import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import validator from "validator";
import { passwordStrength } from "check-password-strength";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "./api";

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

  const loggedInUser = useSelector((state) => state.login.loggedInUser);
  const navigator = useNavigate();

  useEffect(() => {
    if (loggedInUser !== "") {
      navigator("/");
    }
  }, [loggedInUser, navigator]);

  //fetch email
  useEffect(() => {
    const checkEmail = async (_email_) => {
      try {
        if (validator.isEmail(_email_)) {
          setEmailValidity(true);
          const { data } = await api.post("/email", {
            email: _email_,
          });
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
  }, [email]);

  useEffect(() => {
    const checkUsername = async (_username_) => {
      try {
        if (validator.isAlphanumeric(_username_) && _username_.length > 3) {
          setUsernameValidity(true);
          const { data } = await api.post("/username", {
            username: _username_,
          });
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
  }, [username]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isEmailSent === true) {
        setVerifierCodeTimedout(true);
      }
    }, 300000);

    return () => {
      clearTimeout(delay);
    };
  }, [isEmailSent]);

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
          code: verifier,
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
      isPasswordRepeated() &&
      passwordStrength(password).id > 1 &&
      passwordStrength(passwordRepeat).id > 1
    )
      return true;
    return false;
  };

  const emailSubmitHandler = (event) => {
    const sendVerificationCodeEmail = async () => {
      const { statusText } = await api.post("/email-to-be-registered", {
        email: email,
      });

      if (isEmailValid && doesEmailExistsonDb === false) {
        console.log(statusText);
        if (statusText === "OK") {
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
          code: verifier,
        });
        if (data === email) {
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
    <>
      {isEmailSent === false && (
        <Form onSubmit={emailSubmitHandler}>
          <p className="mt-2">Industrialisasi registration. </p>
          <div className="mb-2">
            <p>Please enter your email. </p>
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
              <div className="assist">
                <span role="img" aria-label="warning">
                  ⚠️{" "}
                </span>
                Please use a real email.{" "}
              </div>
            )}
            {doesEmailExistsonDb && (
              <div className="assist">
                <span role="img" aria-label="error">
                  ❌
                </span>{" "}
                This email has been registered. Please use another email.
              </div>
            )}
            {doesEmailExistsonDb === false && isEmailValid && (
              <div className="go">
                <span role="img" aria-label="correct">
                  ✔️{" "}
                </span>
                Email looks good.{" "}
              </div>
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
            <p>Industrialisasi registration. </p>
          </p>
          <div className="mb-2">
            <p>
              Please check <span className="go">{email}'s </span> inbox/spam
              folder, a six character code has been sent to your email.{" "}
            </p>
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
                  <span role="img" aria-label="warning">
                    ⚠️{" "}
                  </span>
                  The Verifier code consists of six character of numbers and
                  letters.{" "}
                </div>
              )}
            {hasVerifierCodeTimedout === true && (
              <div className="assist">
                <span role="img" aria-label="error">
                  ❌
                </span>{" "}
                Timeout. The code is no longer valid. Refresh the page to try
                again.
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
          <p className="mt-2">Industrialisasi registration. </p>
          <div className="mb-2">
            <p>Please enter your username and password. </p>
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
                <span role="img" aria-label="warning">
                  ⚠️{" "}
                </span>{" "}
                Username has to be consisted of only alphabets and numbers.
              </div>
            )}
            {username.length <= 3 && username !== "" && (
              <div className="assist">
                <span role="img" aria-label="warning">
                  ⚠️{" "}
                </span>{" "}
                Username has to be more than 3 characters long.
              </div>
            )}

            {doesUsernameExistsonDb && (
              <div className="assist">
                <span role="img" aria-label="error">
                  {" "}
                  ❌
                </span>{" "}
                Unfortunately, the username had been taken. Please, choose
                another username.
              </div>
            )}
            {doesUsernameExistsonDb === false && isUsernameValid && (
              <div className="go">
                <span role="img" aria-label="correct">
                  ✔️
                </span>{" "}
                Username looks good.{" "}
              </div>
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
            {isPasswordValid() && passwordStrength(password).id < 2 && (
              <div className="assist">
                <span role="img" aria-label="warning">
                  ⚠️
                </span>
                Password is {passwordStrength(password).value.toLowerCase()}
              </div>
            )}
            {isPasswordValid() === false && password !== "" && (
              <div className="assist">
                <span role="img" aria-label="warning">
                  ⚠️{" "}
                </span>
                Password must be more than six characters.
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
            {isPasswordRepeatValid() &&
              passwordStrength(passwordRepeat).id < 2 && (
                <div className="assist">
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>
                  Password is {passwordStrength(passwordRepeat).id}
                </div>
              )}

            {isPasswordRepeatValid() === false && passwordRepeat !== "" && (
              <div className="assist">
                <span role="img" aria-label="warning">
                  ⚠️{" "}
                </span>{" "}
                Password must be more than six characters.
              </div>
            )}
            {isPasswordRepeated() === false && passwordRepeat !== "" && (
              <div className="assist">
                <span role="img" aria-label="warning">
                  ⚠️{" "}
                </span>{" "}
                Passwords don't match.{" "}
              </div>
            )}
            {isPasswordRepeatValid() &&
              isPasswordValid() &&
              isPasswordRepeated() === true &&
              passwordStrength(password).id > 1 &&
              passwordStrength(passwordRepeat).id > 1 && (
                <div className="go">
                  <span role="img" aria-label="correct">
                    ✔️{" "}
                  </span>{" "}
                  Passwords match!
                </div>
              )}
          </Form.Group>
          <Form.Label>
            <div>*) Required.</div>
          </Form.Label>
          <br />
          <Button type="submit">Create Account</Button>
        </Form>
      )}
    </>
  );
};
export default Register;
