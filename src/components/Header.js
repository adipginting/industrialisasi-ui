import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = ({ user, recentlyLoggedIn, isWriting }) => {
  const [loggedInUser, setLoggedInUser] = useState(user);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(recentlyLoggedIn);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]); // this is required to use a prop value as an initial value to a state hook
  useEffect(() => {
    setJustLoggedIn(recentlyLoggedIn);
  }, [recentlyLoggedIn]);

  useEffect(() => {
    if (justLoggedIn === true) window.location.reload();
  }, [justLoggedIn]);

  useEffect(() => {
    if (justLoggedOut === true) window.location.reload();
  }, [justLoggedOut]);

  const logout = (event) => {
    setLoggedInUser("no");
    setJustLoggedOut(true);
    localStorage.setItem("jwttoken", "loggedout");
    event.preventDefault();
  };

  return (
    <Navbar>
      <Navbar.Brand>
        <Link to="/">
          <span role="img" aria-label="factory">
            🏭
          </span>
        </Link>
      </Navbar.Brand>
      <Nav>
        <div className="nav-link">
          <Link to="/">Home</Link>
        </div>
        {(loggedInUser === "no" ||
          loggedInUser === "" ||
          loggedInUser === undefined) && (
          <>
            <div className="nav-link">
              <Link to="/register">Register</Link>
            </div>
            <div className="nav-link">
              <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </Nav>
      {loggedInUser !== "no" &&
        loggedInUser !== "" &&
        loggedInUser !== undefined && (
          <Nav>
            {isWriting !== true && (
              <div className="nav-link">
                {" "}
                <Link to="/write">New Post</Link>
              </div>
            )}
            <div className="nav-link" onClick={logout}>
              Logout {loggedInUser}
            </div>
          </Nav>
        )}
    </Navbar>
  );
};

export default Header;
