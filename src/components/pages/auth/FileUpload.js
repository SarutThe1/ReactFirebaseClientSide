import React from "react";
import Resizer from "react-image-file-resizer";

import axios from "axios";

const FileUpload = () => {
  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
        for (let i = 0; i < files.length; i++){
            Resizer.imageFileResizer(
                files[i],
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                  axios.post(process.env.REACT_APP_API+"/images",
                  {
                    image: uri
                  })
                  .then(res=>{
                    console.log(uri)
                    console.log(res)
                  }).catch(err=>{
                    console.log(err)
                  })
                },
                "base64"
              );
        }
      
    }
  };

  return (
    <>
      <div className="form-group">
        <label className="btn btn-primary">
          Choose profile picture...
          <input
            onChange={handleChangeFile}
            type="file"
            className="form-control"
            name="file"
            accept="images"
            hidden
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
