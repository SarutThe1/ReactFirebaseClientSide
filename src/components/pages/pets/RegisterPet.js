import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";

//function
import { createPet } from "../../functions/pets";

//Router-dom
import { useNavigate } from "react-router-dom";

import PetPicUpload from "./PetPicUpload";
import VaccineUpload from "./VaccineUpload";

const RegisterPet = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [values, setValues] = useState({
    name: "",
    species: "",
    size: "",
    gender: "",
    age: "",
    weight: "",
    congenital_disease: "",
    sterilization: "",
    details: "",
    vaccinationpic: [],
    petpics: [],
    email: user.user.email,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPet(user.user.token, values)
      .then((res) => {
        console.log(res);
        navigate("/mypets");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <Form >
          <div class="form-group">
            <br />
            <div>
              <label for="yourpet">Picture of your pet</label>
            </div>
            <div>
            <PetPicUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
            </div>
            
          </div>

          {/* Name and Species */}
          <div class="form-group">
            <br />
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" onChange={handleChange}/>
          </div>
          <div class="form-group">
            <label for="species">Species</label>
            <input type="text" class="form-control" id="species" onChange={handleChange}/>
          </div>

          {/* Size and Gender */}
          <div className="row">
            <div className="col-md-6">
              <label for="species">Size</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="sizeradios"
                  id="size"
                  value="Small"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="small">
                  Small
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="sizeradios"
                  id="size"
                  value="Medium"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="medium">
                  Medium
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="sizeradios"
                  id="size"
                  value="Large"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="large">
                  Large
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <label for="species">Gender</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="genderradios"
                  id="gender"
                  value="Male"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="Male">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="genderradios"
                  id="gender"
                  value="Female"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="Female">
                  Female
                </label>
              </div>
            </div>
          </div>

          {/* Age and Weight */}
          <div className="row">
            <div className="col-md-6">
              <label for="age">Age</label>
              <input type="text" class="form-control" id="age" onChange={handleChange}/>
            </div>
            <div className="col-md-6">
              <label for="weight">Weight</label>
              <input type="text" class="form-control" id="weight" onChange={handleChange}/>
            </div>
          </div>

          <div class="form-group">
            <label for="congenital_disease">Congenital disease</label>
            <input type="text" class="form-control" id="congenital_disease" onChange={handleChange}/>
          </div>

          {/* Sterilization */}
          <br />
          <div>
            <label>Sterilization</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="sterilizations"
              value="Yes"
              onChange={handleChange}
            />
            <label style={{ marginLeft: "5px" }}>Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" name="inlineRadioOptions" id="sterilization" value="No" onChange={handleChange}/>
            <label style={{ marginLeft: "5px" }}> No</label>
          </div>

          {/* Proof of vaccination */}
          <div class="form-group">
            <br />
            <div>
              <label for="vaccination">Proof of vaccination</label>
            </div>

            <div>
            <VaccineUpload
              values={values}
              setValues={setValues}
              loading={loading2}
              setLoading={setLoading2}
            />
            </div>
          </div>

          {/* details */}
          <div class="form-group">
            <br />
            <label for="details">Other details</label>
            <textarea class="form-control" id="details" rows="3" onChange={handleChange}></textarea>
          </div>
          <br />
          <Button className="btn-lg" style={{ float: "right" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default RegisterPet;
