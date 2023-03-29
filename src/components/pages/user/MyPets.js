import React,{useState,useEffect} from 'react'
import { Button,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { listPet } from '../../functions/pets'

const MyPets = () => {
  const [pet,setPet] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    loadPet()
  },[])

  const loadPet = () => {
    setLoading(true)
    listPet()
    .then(res=>{
      setLoading(false)
      setPet(res.data)
    }).catch(err=>{
      setLoading(false)
      console.log(err)
    })
  }


  return (
    <>
        <Container>
        <div>
            {
              loading 
              ? <h1>Loading...</h1>
              : <h1>My pets</h1>
            }
          </div>
          <br/>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
            <Link to={'/registerpet'}>
                <Button className=" btn btn-lg">Add Pet</Button>
            </Link>
          </div>
          <br/>
          <div>
            {JSON.stringify(pet)}
          </div>

          
            
        </Container>
    </>
  )
}

export default MyPets