import React from "react";
//Router-dom
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

import { Container, Button, Form } from "react-bootstrap";

import FileUpload from "./FileUpload";

//antd
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const EditProfile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const profilePicture = user.user.picture;
  return (
    <>
      <Container>
        <div>
          {profilePicture ? (
            //true
            <div>
              <img
                src={user.user.picture}
                alt="avatar-img"
                className="myprofile-avatar"
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
              <div className="row" >
                <div className="col-md-12" style={{display: "flex",justifyContent: "center",alignItems:'center'}}>
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<UserOutlined style={{ fontSize: 75 }} />}
                  />
                </div>

                <div className="col" style={{display: "flex",justifyContent: "center",alignItems:'center',marginTop:'20px'}}>
                  <FileUpload />
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
              value={user.user.email}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              name="name"
              value={user.user.name}
            />
          </div>

          <div className="form-group">
            <label>Firstname</label>
            <input
              type="text"
              class="form-control"
              name="firstname"
              value={user.user.firstname}
            />
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input
              type="text"
              class="form-control"
              name="lastname"
              value={user.user.lastname}
            />
          </div>
          <div className="form-group">
            <label>telephone</label>
            <input
              type="text"
              class="form-control"
              name="telephone"
              value={user.user.telephone}
            />
          </div>
        </Form>
        <br />

        <Button style={{ float: "right" }}>Save</Button>
      </Container>
    </>
  );
};

export default EditProfile;
