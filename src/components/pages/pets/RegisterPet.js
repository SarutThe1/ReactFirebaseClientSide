import React from 'react'
import { Button,Container,Form } from 'react-bootstrap'


const RegisterPet = () => {
  return (
    <>
        <Container>
            <Form>
                {/* Name and Species */}
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" />
                </div>
                <div class="form-group">
                    <label for="species">Species</label>
                    <input type="text" class="form-control" id="species" />
                </div>

                {/* Size and Gender */}
                <div className='row'>
                    <div className='col-md-6'>
                    <label for="species">Size</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="sizeradios" id="small" value="small"/>
                                <label class="form-check-label" for="small">
                                    small
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="sizeradios" id="medium" value="medium"/>
                                <label class="form-check-label" for="medium">
                                    medium
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="sizeradios" id="large" value="large"/>
                                <label class="form-check-label" for="large">
                                    large
                                </label>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <label for="species">Gender</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="genderradios" id="Male" value="Male"/>
                                <label class="form-check-label" for="Male">
                                    Male
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="genderradios" id="Female" value="Female"/>
                                <label class="form-check-label" for="Female">
                                    Female
                                </label>
                        </div>
                    </div>
                </div>

                {/* Age and Weight */}
                <div className='row'>
                    <div className='col-md-6' >
                        <label for="age">Age</label>
                        <input type="text" class="form-control" id="age" />
                    </div>
                    <div className='col-md-6' >
                        <label for="weight">Weight</label>
                        <input type="text" class="form-control" id="weight" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="congenital_disease">Congenital disease</label>
                    <input type="text" class="form-control" id="congenital_disease" />
                </div>

                {/* Sterilization */}
                <br/>
                <div>
                    <label>Sterilization</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" name="inlineRadioOptions" id="yes" value="yes"/>
                    <label style={{marginLeft:'5px'}}>Yes</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" name="inlineRadioOptions" id="no" value="no"/>
                    <label style={{marginLeft:'5px'}}> No</label>
                </div>
                
                {/* Proof of vaccination */}
                <div class="form-group">
                <br/>
                    <div>
                        <label for="vaccination">Proof of vaccination</label>
                    </div>
                    
                    <input type="file" class="form-control-file" id="vaccination"/>
                </div>

                {/* details */}
                <div class="form-group">
                    <br/>
                    <label for="details">Other details</label>
                    <textarea class="form-control" id="details" rows="3"></textarea>
                </div>


            </Form>
        </Container>
    </>
  )
}

export default RegisterPet