import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined,EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


const { Meta } = Card;



const UserPetCard = ({ pet,handleDelete }) => {
  
  const { _id,name, gender, species, age, petpics } = pet;
  return (
    <>
      
      <Card
      
        hoverable
        style={{
          width: 500,
          
        }}
        cover={
          <img
          style={{height:'150px',objectFit:'cover'}}
            alt="example"
            src={petpics && petpics.length
                ? petpics[0].url
                : ""
            }
          />
        }

        actions={[
          <Link to={'/singlepet/' +_id}><EyeOutlined className="text-success" /></Link>,
            <Link to={'/updatepet/' +_id}><EditOutlined className="text-warning" /></Link>,
            <DeleteOutlined className="text-danger" onClick={()=>handleDelete(_id)}/>,
          ]}
      >
        <Meta title={name} 
        description={
            <p>{species} {gender} {age}</p>
            
        } 
        />
        
      </Card>
    </>
  );
};

export default UserPetCard;
