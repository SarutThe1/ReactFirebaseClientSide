import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

//function
import { register } from "../../functions/auth";


const Register = () => {
  const [value, setValue] = useState({
    email: "",
    name: "",
    firstname: "",
    lastname: "",
    telephone: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log(value); */
    if (value.password !== value.password1) {
      alert("Password not match!");
    } else {
      register(value)
      .then(res=>{
        alert(res.data)
      }).catch(err=>{
        console.log(err.response.data);
        alert(err.response.data)
      })
    }
  };

  return (
    <>
      <Container>
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
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Firstname</label>
            <input
              type="text"
              class="form-control"
              name="firstname"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input
              type="text"
              class="form-control"
              name="lastname"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>telephone</label>
            <input
              type="text"
              class="form-control"
              name="telephone"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="text"
              class="form-control"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="text"
              class="form-control"
              name="password1"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <Button
              type="submit"
              style={{ float: "right" }}
              disabled={value.password.length < 6}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
