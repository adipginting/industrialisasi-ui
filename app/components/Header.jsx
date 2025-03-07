import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    event.preventDefault();
    setLoggedInUser("");
    dispatch(loggedInUserAdded(loggedInUser));
    sendLogout.mutate();
    window.location.reload();
  };

  useEffect(() => {
    dispatch(loggedInUserAdded(data));
    setLoggedInUser(data);
  }, [data, dispatch]);

  return (
    <div>
      <Link to="/">
        <span role="img" aria-label="factory">
          🏭
        </span>
      </Link>

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

      {/* {loggedInUser !== "" && loggedInUser !== undefined && (
       
          {isWriting !== true && (
            <div className="nav-link">
              {" "}
              <Link to="/write">New Post</Link>
            </div>
          )}
          <div className="nav-link" onClick={logout}>
            Logout {loggedInUser}
          </div>
     
      )} */}
    </div>
  );
};

export default Header;
