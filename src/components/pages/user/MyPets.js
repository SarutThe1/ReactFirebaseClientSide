import React from 'react'
import { Button,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyPets = () => {
  return (
    <>
        <Container>
            <Link to={'/registerpet'}>
                <Button>Add Pet</Button>
            </Link>
        </Container>
    </>
  )
}

export default MyPets