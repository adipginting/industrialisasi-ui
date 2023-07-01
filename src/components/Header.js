import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUsername, logoutUser } from "./api";
import { loggedInUserAdded } from "./redux";
import { useDispatch } from "react-redux";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUsername,
  });

  const sendLogout = useMutation({
    mutationFn: logoutUser,
  });

  const logout = (event) => {
    setLoggedInUser("");
    dispatch(loggedInUserAdded(loggedInUser));
    event.preventDefault();
    sendLogout.mutate();
    window.location.reload();
  };

  useEffect(() => {
    dispatch(loggedInUserAdded(data));
    setLoggedInUser(data);
  }, [data, dispatch]);

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
        {(loggedInUser === "" || loggedInUser === undefined) && (
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
      {loggedInUser !== "" && loggedInUser !== undefined && (
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
