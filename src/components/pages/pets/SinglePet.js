import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readPet } from "../../functions/pets";

import SinglePetCard from "../../card/SinglePetCard";

import { deletePet } from "../../functions/pets";
import { useNavigate } from "react-router-dom";

const SinglePet = () => {
  const navigate = useNavigate()
  const params = useParams();
  const [pet, setPet] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readPet(params.id)
      .then((res) => {
        setPet({ ...pet, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) =>{
    if(window.confirm("Are you sure to delete ?")){
      deletePet(id)
      .then(res=>{
        navigate('/mypets')
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }

  return (
    <>
        <div className="container">
            <button className="btn btn-primary" onClick={() => navigate('/mypets')}>My Pet</button>
        </div>
      <div>
        <SinglePetCard pet={pet} handleDelete={handleDelete}/>
      </div>
    </>
  );
};

export default SinglePet;
