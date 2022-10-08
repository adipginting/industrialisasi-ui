import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => (
  <Navbar>
    <Navbar.Brand><Link to="/"><span role="img" aria-label="factory">🏭</span></Link></Navbar.Brand>

    <Nav>
      <Nav.Link>
        <Link to="/">Home</Link>
      </Nav.Link>
      <Nav.Link>
        {" "}
        <Link to="/Register">Register</Link>{" "}
      </Nav.Link>
      <Nav.Link>
        {" "}
        <Link to="/Login">Login</Link>{" "}
      </Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
