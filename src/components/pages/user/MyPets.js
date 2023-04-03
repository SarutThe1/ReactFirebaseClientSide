import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux"
import { Button,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { searchFilters,deletePet } from '../../functions/pets'
import UserPetCard from '../../card/UserPetCard'

const MyPets = () => {
  const [pet,setPet] = useState([]);
  const [loading,setLoading] = useState(false)
  const { user } = useSelector((state) => ({ ...state }));
  const  email  = user.user.email;

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ email : email });
    }, 300);
    return () => clearTimeout(delay);
  }, [email]);

  //Filter
  const fetchDataFilter = (arg) => {
    setLoading(true);
    searchFilters(arg)
      .then((res) => {
        setLoading(false);
        setPet(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleDelete = (id) =>{
    if(window.confirm("Are you sure to delete ?")){
      deletePet(id)
      .then(res=>{
        fetchDataFilter({ email : email })
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }

  

  return (
    <>
        <Container>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            {
              loading 
              ? <h1>Loading...</h1>
              : <h1>You have {pet.length} pets</h1>
            }
          </div>
          
          <br/>
          <div style={{display:'grid',alignItems:'center',justifyContent:'center'}}>
            {

              pet.map((item)=>
                <div key={item._id} style={{marginBottom:20}}>
                  
                  <UserPetCard pet={item} handleDelete={handleDelete} />
                </div>
                
              )
            }
            
          </div>

          <br/>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
            <Link to={'/registerpet'}>
                <Button className=" btn btn-lg">+ Add more pet</Button>
            </Link>
          </div>
            
        </Container>
    </>
  )
}

export default MyPets