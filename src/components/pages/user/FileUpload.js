import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Spin, Badge } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import axios from "axios";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user.user.picture.length)
  const handleChangeFile = (e) => {
    if (user.user.picture.length > 0) {
      const { picture } = values;
      const public_id = picture[0].public_id;
      handleRemove(public_id);
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
    } else {
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
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    const { picture } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        { headers: { authtoken: user.user.token } }
      )
      .then((res) => {
        setLoading(false);
        
        let filterPicture = picture .filter((item) => {
          picture.length = 0;
          return item.public_id !== public_id;
        });
        setValues({ ...values, picture : filterPicture });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div>
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
             
              <Avatar src={item.url} size={130} />
             
            </div>
          ))}
        <div>
          <label
            className="btn btn-success"
            style={{
              borderRadius: "50%",
              position: "relative",
              left: "90px",
              top: "-35px",
            }}
          >
            {loading ? (
              <p>
                <Spin />
              </p>
            ) : (
              <CameraOutlined style={{ fontSize: 20 }} />
            )}

            <input
              onChange={handleChangeFile}
              type="file"
              name="file"
              accept="images/*"
              hidden
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
