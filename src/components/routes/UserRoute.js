import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const UserRoute = ({children}) => {
    const navigate = useNavigate()
    const {user} = useSelector((state)=>({...state}))
    console.log('Hello userRoute',user)


  return user.user && user.user.token
    ? children //true
    : (<h1>No Permission...Please Login first 
        <button onClick={()=>navigate('/login')}>Login</button>
        </h1>)//false
}

export default UserRoute