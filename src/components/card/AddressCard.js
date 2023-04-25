import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { updateAd, readAd } from "../functions/address";

const initialstate = {
  details: "",
};

const AddressCard = ({ address, handleDelete }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { _id, details } = address;
  const [values, setValues] = useState(initialstate);
  /* console.log(values) */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readAd(_id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAd(user.user.token, _id, values)
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      
        <Card hoverable style={{ width: 300 }}>
          <div className="row">
            <div className="col-md-10">
              <p>{details}</p>
            </div>
            <div className="col-md-2">
              <EditOutlined
                className="text-primary"
                style={{ marginBottom: "15px" }}
                onClick={showModal}
              />
              <DeleteOutlined
                className="text-danger"
                onClick={() => handleDelete(_id)}
              />
            </div>
          </div>
        </Card>

      <Modal
        title="Edit Address"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <label for="details">details</label>
          <input
            className="form-control"
            type="text"
            id="details"
            value={values.details}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddressCard;
