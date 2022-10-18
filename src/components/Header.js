import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { api } from '../api';

const Header = () =>
{
  const [loggedUser, setLoggedUser ] = useState('no');
  const [LoggedOut, setLoggedOut] = useState(false);
  const navigator = useNavigate();
  useEffect(
    () => {
      const checkJWTToken = async () => {
        const response =  await api.get("/jwtvalidation");
        console.log(response.data);
        if (response.data === 'no'){
          setLoggedUser(response.data);
          setLoggedOut(true);
        } else {
          setLoggedUser(response.data);
          setLoggedOut(false);
        }
      }
    checkJWTToken();
    }, [setLoggedUser, setLoggedOut]
  );

  useEffect(()=>{
    if (LoggedOut === true)
      navigator('/login');
    //else ()
  },[loggedUser, LoggedOut]);

  const logout = (event) => {
    setLoggedUser('no');
    setLoggedOut(true);
    localStorage.setItem("jwttoken", "loggedout");
    event.preventDefault();
  };

  return(
    <Navbar>
      <Navbar.Brand><Link to="/"><span role="img" aria-label="factory">🏭</span></Link></Navbar.Brand>
      <Nav>
        <div className="nav-link">
          <Link to="/">Home</Link>
        </div>
      { loggedUser ==='no' &&
        <div className="nav-link">
          <Link to="/Register">Register</Link>
        </div>
      }
      { loggedUser === 'no' &&
        <div className="nav-link">
          <Link to="/login">Login</Link>
        </div>
      }
      { loggedUser !== 'no' &&
        <div className="nav-link" onClick={logout}>Logout {loggedUser}</div>
      }
      </Nav>
    </Navbar>
)};

export default Header;
