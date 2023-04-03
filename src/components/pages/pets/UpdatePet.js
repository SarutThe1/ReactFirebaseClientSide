import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { readPet, updatePet } from "../../functions/pets";

import PetPicUpload from "./PetPicUpload";
import VaccineUpload from "./VaccineUpload";

import { Button, Container, Form } from "react-bootstrap";

const initialstate = {
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
};

const UpdatePet = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readPet(params.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePet(user.user.token, values._id, values)
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
        <Form>
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
            <input
              type="text"
              class="form-control"
              id="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="species">Species</label>
            <input
              type="text"
              class="form-control"
              id="species"
              value={values.species}
              onChange={handleChange}
            />
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
                  checked={values.size === 'Small'}
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
                  checked={values.size === 'Medium'}
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
                  checked={values.size === 'Large'}
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
                  checked={values.gender === 'Male'}
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
                  checked={values.gender === 'Female'}
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
              <input
                type="text"
                class="form-control"
                id="age"
                value={values.age}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label for="weight">Weight</label>
              <input
                type="text"
                class="form-control"
                id="weight"
                value={values.weight}
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="form-group">
            <label for="congenital_disease">Congenital disease</label>
            <input
              type="text"
              class="form-control"
              id="congenital_disease"
              value={values.congenital_disease}
              onChange={handleChange}
            />
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
              checked={values.sterilization === 'Yes'}
            />
            <label style={{ marginLeft: "5px" }}>Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="sterilization"
              value="No"
              onChange={handleChange}
              checked={values.sterilization === 'No'}
            />
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
            <textarea
              class="form-control"
              id="details"
              value={values.details}
              rows="3"
              onChange={handleChange}
            ></textarea>
          </div>
          <br />
          <Button
            className="btn-lg"
            style={{ float: "right" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UpdatePet;
