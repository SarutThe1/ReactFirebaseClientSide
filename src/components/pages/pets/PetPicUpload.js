import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge, Spin } from "antd";

import axios from "axios";

const PetPicUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      const PetPicUpload = values.petpics;
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
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
                PetPicUpload.push(res.data);
                console.log("fileUpload", res.data);
                setValues({ ...values, petpics: PetPicUpload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    const { petpics } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        { headers: { authtoken: user.user.token } }
      )
      .then((res) => {
        setLoading(false);
        let filterPicture = petpics.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, petpics: filterPicture });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
        {values.petpics &&
          values.petpics.map((item, index) => (
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
          {loading ? (
            <p>
              Loading...
              <Spin />
            </p>
          ) : (
            <p>Choose pet picture</p>
          )}

          <input
            onChange={handleChangeFile}
            type="file"
            className="form-control"
            name="file"
            multiple
            accept="images/*"
            hidden
          />
        </label>
      </div>
    </>
  );
};

export default PetPicUpload;
