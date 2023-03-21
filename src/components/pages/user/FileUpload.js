import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";

import axios from "axios";


const FileUpload = ({ values, setValues , loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true)
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
              setLoading(false)
              picUpload.push(res.data.url);
              console.log("fileUpload", res.data.url);
              setValues({ ...values, picture: picUpload });
            })
            .catch((err) => {
              setLoading(false)
              console.log(err);
            });
        },
        "base64"
      );
    }
  };

  return (
    <>
        <div className="form-group" >
          <label >
            {loading
              ? <p>Loading...</p>
              : <p>Choose profile picture...</p>
            }
            
            <input
              onChange={handleChangeFile}
              type="file"
              className="form-control"
              name="file"
              accept="images/*"
              /* hidden */
            />
          </label>
        </div>
      
    </>
  );
};

export default FileUpload;
