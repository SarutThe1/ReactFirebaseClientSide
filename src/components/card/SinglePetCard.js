import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SinglePetCard = ({ pet, handleDelete }) => {
  const {
    _id,
    name,
    species,
    size,
    gender,
    age,
    weight,
    congenital_disease,
    sterilization,
    details,
    vaccinationpic,
    petpics,
  } = pet;

  return (
    <>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img
            style={{ height: "150px", width: "400px" }}
            alt="example"
            src={petpics && petpics.length ? petpics[0].url : ""}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Link to={"/updatepet/" + _id}>
            <EditOutlined className="text-success" style={{ fontSize: 30 }} />
          </Link>
          <DeleteOutlined
            className="text-danger"
            onClick={() => handleDelete(_id)}
            style={{ fontSize: 30, marginLeft: 15 }}
          />
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <h3 style={{ marginRight: "10px", color: "blue" }}>{name}</h3>
          <h3 style={{ marginRight: "10px" }}>{gender}</h3>
          <h3>{sterilization}</h3>
        </div>

        {/* row of breed size age weight */}
        <div className="row">
          <div className="col-md-3">breed</div>
          <div className="col-md-3">size</div>
          <div className="col-md-3">age</div>
          <div className="col-md-3">weight</div>
        </div>
        <div className="row">
          <div className="col-md-3">{species}</div>
          <div className="col-md-3">{size}</div>
          <div className="col-md-3">{age}</div>
          <div className="col-md-3">{weight}</div>
        </div>
          <br/>
        <div>
            <h5>Congenital disease</h5>
            {congenital_disease}
        </div>  

        <br/>
        <div>
            <h5>Other details</h5>
            {details}
        </div>  

        <br/>
        <div>
            <h5>Proof of vaccination</h5>
            <img
            style={{ height: "150px", width: "400px" }}
            alt="example"
            src={vaccinationpic && vaccinationpic.length ? vaccinationpic[0].url : ""}
          />
        </div>  

      </div>
    </>
  );
};

export default SinglePetCard;
