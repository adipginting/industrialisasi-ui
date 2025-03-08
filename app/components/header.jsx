import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUsername, logoutUser } from "./api/index.js";
import { loggedInUserAdded } from "./redux/index.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

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
    <div className="flex flex-row gap-x-3">
      <Link to="/">
        <span role="img" aria-label="factory">
          🏭
        </span>
      </Link>

      <div className="">
        <Link to="/">Home</Link>
      </div>
      {(loggedInUser === "" || loggedInUser === undefined) && (
        <>
          <div className="">
            <Link to="/register">Register</Link>
          </div>
          <div className="">
            <Link to="/login">Login</Link>
          </div>
        </>
      )}

      {loggedInUser !== "" && loggedInUser !== undefined && (
       
          // {!isWriting && (
          //   <div className="nav-link">
          //     {" "}
          //     <Link to="/write">New Post</Link>
          //   </div>
          // )}
          <div className="nav-link" onClick={logout}>
            Logout {loggedInUser}
          </div>
     
      )}
    </div>
  );
};

export default Header;
