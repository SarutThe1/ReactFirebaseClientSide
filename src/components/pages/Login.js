import React from 'react'

import { Container,Button } from 'react-bootstrap'
//firebase
import { auth,googleAuthProvider } from '../firebase'

//redux
import { useSelector,useDispatch } from 'react-redux'
import { login,logout } from '../../store/userSlice'

//function
import { createAndUpdateUser } from '../functions/auth'

const Login = () => {

  const {user} = useSelector((state)=> ({...state}))
  const dispatch = useDispatch()

  


  const handleLoginByGoogle = async() => {
    auth.signInWithPopup(googleAuthProvider)
    .then(async(result)=>{
      console.log('result',result)
      const {user} = result
      const idToken = await user.getIdTokenResult();

      console.log(user.email, idToken)
      createAndUpdateUser(idToken.token)
      .then((res)=>{
        dispatch(login({
          email: res.data.email,
          name:res.data.name,
          token: idToken.token
        }))
      })
      .catch((err)=>console.log(err))

    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <Container>
        <h1>{user.value}</h1>
        <Button onClick={handleLoginByGoogle}>Sign in with Google</Button>

      </Container>
    

    </>
  )
}

export default Login