import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";

import axios from "axios";

const FileUpload = () => {
  const {user} = useSelector((state)=>({...state}))
  
  
  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
        
            Resize.imageFileResizer(
                files[0],
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                  axios.post(process.env.REACT_APP_API + "/images",
                  {
                    image : uri,
                  },
                  {
                    headers: {
                      authtoken: user.user.token
                    }
                  }
                  )
                  .then(res=>{
                    console.log(res)
                  }).catch(err=>{
                    console.log(err)
                  })
                },
                "base64"
              );
        
      
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
