import React, { useState } from "react";
import "./login.css";

import { Container, Button, Form } from "react-bootstrap";
//firebase
import { auth, googleAuthProvider } from "../../firebase";

//redux
import { useDispatch } from "react-redux";
import { login } from "../../../store/userSlice";

//function
import { createAndUpdateUser, loginN } from "../../functions/auth";

//Router-dom
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  //Redirect
  const roleBaseRedirect = (role) => {
    if(role === 'admin'){
      navigate('/admin/index')
    }else{
      navigate('/')
    }
  }

  //Login normal
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    

    loginN(value)
      .then((res) => {
        alert("Login successful");
        
        dispatch(
          login({
            email: res.data.payload.user.email,
            name: res.data.payload.user.username,
            telephone: res.data.payload.user.telephone,
            role:res.data.payload.user.role,
            token: res.data.token,
          })
        );
        localStorage.setItem('token',res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
        
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };

  //Login by Google
  const handleLoginByGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        console.log("result", result);
        const { user } = result;
        const idToken = await user.getIdTokenResult();

        console.log(user.email, idToken);
        createAndUpdateUser(idToken.token)
          .then((res) => {
            dispatch(
              login({
                email: res.data.email,
                name: res.data.name,
                token: idToken.token,
              })
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className="center">
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              onChange={handleChange}
            />
          </div>

          <br />
          <div className="form-group">
            <Button type="submit" style={{ float: "right" }}>
              Submit
            </Button>
          </div>


          <div className="form-group" >
            <Button className="btn btn-success" onClick={handleLoginByGoogle} style={{marginTop:"10px",width:"100%"}}>Sign in with Google</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
