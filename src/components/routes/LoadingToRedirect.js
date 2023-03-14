import { current } from '@reduxjs/toolkit';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { Container } from "react-bootstrap";

const LoadingToRedirect = () => {
    const navigate = useNavigate();
    const [count,setCount] = useState(3);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        },1000)
        //Redirect
        count === 0 && navigate('/login')
        return () => clearInterval(interval)
    },[count])

  return (
    <>
        <Container>
            <h1>No permission, Redirect in {count}</h1>
        </Container>
    </>
  )
}

export default LoadingToRedirect