import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge, Spin } from "antd";

import axios from "axios";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      const picUpload = values.picture;
      Resize.imageFileResizer(
        files[0],
        150,
        150,
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
              setValues({ ...values, picture: picUpload });
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
    const {picture} = values
    axios.post(process.env.REACT_APP_API + '/removeimages',{public_id},{headers:{authtoken:user.user.token}})
    .then(res=>{
      setLoading(false)
        let filterPicture = picture.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, picture: filterPicture });
    }).catch(err=>{
      setLoading(false)
      console.log(err)
    })
  }


  return (
    <>
      {values.picture &&
        values.picture.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            <Badge count={"X"} style={{cursor:'pointer'}} onClick={() => handleRemove(item.public_id)} >
              <Avatar src={item.url} size={130} />
            </Badge>
          </div>
        ))}

      <div className="form-group">
        <label className="btn btn-success">
          {loading ? <p>Loading...<Spin/></p> : <p>Choose profile picture</p>}

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

export default FileUpload;
