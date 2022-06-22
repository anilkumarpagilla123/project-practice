import React from "react";
import logoImg from "../images/downlogo.png";
import "./Header.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {clearLoginStatus} from "../../slices/userSlice";

function Header() {

  //get state from local store
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
  //get dispatch function
  let dispath=useDispatch();
  //get navigate function
  let navigate=useNavigate();

  //logout user
  const userLogout=()=>{
    localStorage.clear();
    dispath(clearLoginStatus());
    navigate('/login')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <img src={logoImg} alt="" className="logo-Img"/>
          <Navbar.Brand className="textstyle">Make a Difference</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">

              {isSuccess!==true ?(
              <>  
              {/*These links can be visible when no user logged in */}
              <Nav.Item>
                <Nav.Link eventKey="1" as={NavLink} to="/" className="textsty">
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="2" as={NavLink} to="/signup" className="textsty">
                  Signup
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="3" as={NavLink} to="/login" className="textsty">
                  Login
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="4" as={NavLink} to="/contactus" className="textsty">
                  ContactUs
                </Nav.Link>
              </Nav.Item>
              </>
              ):(

              <>
              {/* dropdown should appear when a user is logged in*/}
                <NavDropdown title={userObj.username} id="collasible-nav-dropdown drop-down">
                  <NavDropdown.Item>
                    Change password
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}

export default Header;