import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { CameraOutlined } from '@ant-design/icons';

const Secret = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  const pic = user.user.picture[0];
  return (
    <>
      <h2>You login for this Secret</h2>

      <div>
        {typeof pic === "string" ? (
          <div>
            {user.user.picture &&
              user.user.picture.map((item, index) => (
                
                  <Badge
                    size="large"
                    count={<CameraOutlined />}
                    style={{ cursor: "pointer" }}
                  >
                    <Avatar src={item} key={index} size={100} />
                  </Badge>
                
              ))}
          </div>
        ) : (
          <div>
            {user.user.picture &&
              user.user.picture.map((item, index) => (
                  
                  <Badge

                    offset={[0,80]}
                    count={<CameraOutlined style={{fontSize:'20px'}}/>}
                    style={{ cursor: "pointer"}}
                  >
                    <Avatar src={item.url} key={index} size={100} />
                  </Badge>
                
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Secret;
