import React from 'react'
import { useSelector } from "react-redux";
import { Avatar } from "antd";
const Secret = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user)
  return (
    <div>You login for this Secret
      
      {user.user.picture &&
        user.user.picture.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
              <Avatar src={item} size={130} />
           
          </div>
        ))}
    </div>
  )
}

export default Secret