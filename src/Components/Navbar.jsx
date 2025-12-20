import { Button, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Assets/logo_Gemini.png';
import '../Styles/navbar.css';
import '../index.css';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../Services/tokenServices";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { showSuccessToast } from "../Utils/toastConfig";

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); 
  const token = localStorage.getItem('token');

  const fecthUser  = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const goodToken = verifyToken(token);
      if (goodToken) {
        setUserName(jwtDecode(token).nickname);
      } else {
        localStorage.removeItem('token');
        setUserName("");
      }
    }
  }
  const logOut = () => {
    localStorage.removeItem('token');
    showSuccessToast('logout.success');
    navigate('/');
  };
  
  useEffect(() => {
    fecthUser();
  }, []);

  return (
    <>
      <Navbar className="navbar sticky-top" expand="xl">
        <Navbar.Brand className="navbarBrand" href="/">
          <img className="logo" src={logo} alt="Logo RPG Creator" />
          <div className="titre">
            <p>Lore Crafters: </p>
            <p>a dice story</p>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navText  me-auto">
            <Nav.Link className="navLink" onClick={() => navigate('/')} alt="Accueil">Accueil</Nav.Link>
            <Nav.Link className="navLink" onClick={() => navigate('/profile')} alt="Profile">Profil</Nav.Link>
            <Nav.Link className="navLink" href="Lancé de dès">Lancé de dès</Nav.Link>
            <Nav.Link className="navLink" href="Comment fonctionne le jeu de rôle">Comment fonctionne le jeu de rôle</Nav.Link>
          </Nav>
          <div className="navButton ms-auto">
            {token ? (
              <>
                <p>Bienvenue {userName}</p>
                <Button className="Button" onClick={logOut}>Déconnexion</Button>
              </>
            ) : (
              <Button className="Button" onClick={() => navigate('/register')}>Connexion</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
