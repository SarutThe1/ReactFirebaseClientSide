import React from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";

import { Container, Button, Form } from "react-bootstrap";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const profilePicture = user.user.picture;
  return (
    <>
      <Container>
        <div>
            {profilePicture
                ? 
                    <img
                    src={user.user.picture}
                    alt="avatar-img"
                    className="myprofile-avatar"
                    />
                :<h2>No Profile Picture</h2>
            }
            
          
        </div>
        {/* MENU SECTION */}
        <Form>
          <div className="form-group">
            <label>Email</label>
            <input
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
              name="username"
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
      </Container>
    </>
  );
};

export default MyProfile;
