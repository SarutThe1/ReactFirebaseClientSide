import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge, Spin } from "antd";

import axios from "axios";

const VaccineUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      const picUpload = values.vaccinationpic;
      Resize.imageFileResizer(
        files[0],
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post(
              process.env.REACT_APP_API + "/images",
              {
                image: uri,
              },
              {
                headers: {
                  authtoken: user.user.token,
                },
              }
            )
            .then((res) => {
              setLoading(false);
              picUpload.push(res.data);
              console.log("fileUpload", res.data);
              setValues({ ...values, vaccinationpic: picUpload });
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        },
        "base64"
      );
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true)
    const {vaccinationpic} = values
    axios.post(process.env.REACT_APP_API + '/removeimages',{public_id},{headers:{authtoken:user.user.token}})
    .then(res=>{
      setLoading(false)
        let filterPicture = vaccinationpic.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, vaccinationpic: filterPicture });
    }).catch(err=>{
      setLoading(false)
      console.log(err)
    })
  }


  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        {values.vaccinationpic &&
          values.vaccinationpic.map((item, index) => (
            <span key={index} className="avatar-item">
              <Badge
                count={"X"}
                style={{ cursor: "pointer" }}
                onClick={() => handleRemove(item.public_id)}
              >
                <Avatar src={item.url} size={130} shape={"square"} />
              </Badge>
            </span>
          ))}
      </div>

      <div className="form-group">
        <label className="btn btn-success">
          {loading ? <p>Loading...<Spin/></p> : <p>Choose vaccination Picture</p>}

          <input
            onChange={handleChangeFile}
            type="file"
            className="form-control"
            name="file"
            accept="images/*"
            hidden
          />
        </label>
      </div>
    </>
  );
};

export default VaccineUpload;
