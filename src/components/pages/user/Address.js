import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Button, Modal } from "antd";

import { searchFiltersAd, createAd,deleteAd } from "../../functions/address";
import AddressCard from "../../card/AddressCard";

const Address = ({setResponse}) => {
  const [address, setAddress] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const email = user.user.email;
  /* console.log(address) */
  const [values, setValues] = useState({
    details: "",
    email: email,
  });
  /* console.log(address); */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createAd(user.user.token, values)
      .then((res) => {
        fetchDataFilter({ email: email });
        console.log(res);
        setIsAddModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ email: email });
    }, 300);
    return () => clearTimeout(delay);
  }, [email]);

  //Filter
  const fetchDataFilter = (arg) => {
    searchFiltersAd(arg)
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) =>{
    if(window.confirm("Are you sure to delete ?")){
      deleteAd(id)
      .then(res=>{
        fetchDataFilter({ email : email })
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
  const handleClick = (item) =>{
    setResponse(item.details)
  }


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Container>
        <br />

        {address.map((item) => (
          <div key={item._id} style={{ marginBottom: 20 }}>
            <Link to={'/editprofile'} style={{textDecoration:'none'}} onClick={() => handleClick(item)}>
              <AddressCard address={item} handleDelete={handleDelete}/>
            </Link>
          </div>
        ))}
        <br />
        <Button type="primary" onClick={showAddModal}>
          Add more address
        </Button>

        <Modal
          title="Add address"
          open={isAddModalOpen}
          onOk={handleSubmit}
          onCancel={handleAddCancel}
        >
          <div className="form-group">
            <label for="details">details</label>
            <input
              className="form-control"
              type="text"
              id="details"
              onChange={handleChange}
            />
          </div>
        </Modal>




      </Container>
    </>
  );
};

export default Address;
