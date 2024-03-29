import React from "react";

import {Container,Navbar,Nav,Button} from 'react-bootstrap';

//Router-dom
import { Link,useNavigate } from "react-router-dom";
import {auth} from '../firebase'

//redux
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userSlice'

const Headers = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleLogout =()=>{
    auth.signOut()
    dispatch(logout())
    navigate('/login')
    
  }


  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link> <Link to='/'>Home</Link> </Nav.Link>
            <Nav.Link> <Link to='/secret'>Secret</Link> </Nav.Link>
            <Nav.Link> <Link to='/admin/index'>Admin</Link> </Nav.Link>
            <Nav.Link> <Link to='/editprofile'>Profile</Link> </Nav.Link>
            <Nav.Link> <Link to='/mypets'>My Pets</Link> </Nav.Link>
            <Nav.Link> <Link to='/otp'>OTP</Link> </Nav.Link>
            <Nav.Link> <Link to='/address'>Address</Link> </Nav.Link>
            
            
          </Nav>

          <Navbar.Collapse className="justify-content-end">
          <Nav.Link style={{marginRight:"10px"}}> <Link to='/register'>Register</Link> </Nav.Link>
          <Nav.Link style={{marginRight:"10px"}}><Link to='/login'><Button className="btn btn-success" >Login</Button></Link> </Nav.Link>
          <Nav.Link onClick={handleLogout} > <Button className="btn btn-danger">Logout</Button> </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
