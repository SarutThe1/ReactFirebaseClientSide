import React, { useEffect, useState } from "react";
//Router-dom
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

import { Container, Button, Form } from "react-bootstrap";

import FileUpload from "./FileUpload";

//antd

import { Avatar } from "antd";

//function
import { readUser, updateUser } from "../../functions/user";

const initialstate = {
  email: "",
  name: "",
  firstname: "",
  lastname: "",
  telephone: "",
  picture: [],
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState(initialstate);
  const pic = values.picture[0];
 
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readUser(user.user._id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.user.token, user.user._id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        {typeof pic === "string" ? (
          <div>
            {user.user.picture &&
              user.user.picture.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    marginTop: "20px",
                  }}
                >
                  <Avatar src={item} size={130} />
                </div>
              ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        )}

        {/* MENU SECTION */}
        <Form>
          <div className="form-group">
            <label>Email</label>
            <input
              disabled
              type="text"
              className="form-control"
              name="email"
              value={values.email}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Firstname</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>telephone</label>
            <input
              type="text"
              className="form-control"
              name="telephone"
              value={values.telephone}
              onChange={handleChange}
            />
          </div>
        </Form>
        <br />

        <Button style={{ float: "right" }} onClick={handleSubmit}>
          Save
        </Button>
      </Container>
    </>
  );
};

export default EditProfile;
