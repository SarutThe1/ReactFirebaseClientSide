import React, { useEffect, useState } from "react";
//Router-dom
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

import { Container, Button, Form } from "react-bootstrap";

import FileUpload from "./FileUpload";

//antd
import { UserOutlined } from "@ant-design/icons";
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
  const profilePicture = user.user.picture;
  const[loading,setLoading] = useState(false)

  const [values, setValues] = useState(initialstate);
  
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
        <div>
          {profilePicture ? (
            //true
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                size={{ xs: 124, sm: 132, md: 140, lg: 164, xl: 180, xxl: 200 }}
                src={
                  <img
                    src={profilePicture}
                    alt="avatar-img"
                    className="myprofile-avatar"
                  />
                }
              />
            </div>
          ) : (
            //false
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="row">
                <div
                  className="col-md-12"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<UserOutlined style={{ fontSize: 75 }} />}
                  />
                </div>

                <div
                  className="col"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <FileUpload values={values} setValues={setValues} loading={loading} setLoading={setLoading} />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* MENU SECTION */}
        <Form>
          <div className="form-group">
            <label>Email</label>
            <input
              disabled
              type="text"
              class="form-control"
              name="email"
              value={values.email}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Firstname</label>
            <input
              type="text"
              class="form-control"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input
              type="text"
              class="form-control"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>telephone</label>
            <input
              type="text"
              class="form-control"
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
