import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";

import axios from "axios";

import { Avatar, Badge, Space } from "antd";

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      const picUpload = values.picture;
      Resize.imageFileResizer(
        files[0],
        300,
        300,
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
              picUpload.push(res.data);
              console.log("fileUpload", picUpload);
              setValues({ ...values, picture: picUpload });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        "base64"
      );
    }
  };

  return (
    <>
      <span className="avartar-item">
        <Badge count="X">
          <Avatar shape="square"  />
        </Badge>
      </span>
      <div className="form-group">
        <label className="btn btn-primary">
          Choose profile picture...
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
