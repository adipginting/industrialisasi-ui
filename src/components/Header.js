import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => (
  <Navbar>
    <Navbar.Brand><Link to="/"><span role="img" aria-label="factory">🏭</span></Link></Navbar.Brand>

    <Nav>
      <div className="nav-link">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-link">
        {" "}
        <Link to="/Register">Register</Link>{" "}
      </div>
      <div className="nav-link">
        {" "}
        <Link to="/Login">Login</Link>{" "}
      </div>
      <div className="nav-link">
        <Link to="/About">About</Link>
      </div>
    </Nav>
  </Navbar>
);

export default Header;
