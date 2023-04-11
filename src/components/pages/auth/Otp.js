import React from "react";
import { Container } from "react-bootstrap";
const Otp = () => {
  return (
    <>
      <Container>
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>OTP</h1>
          </div>

          <div >
            <form >
              <input name="otp1" type="text" tabIndex="1" maxLength="1" style={{textAlign:'center'}}/>

              <input name="otp2" type="text" tabIndex="2" maxLength="1" style={{textAlign:'center'}}/>

              <input name="otp3" type="text" tabIndex="3" maxLength="1" style={{textAlign:'center'}}/>

              <input name="otp4" type="text" tabIndex="4" maxLength="1" style={{textAlign:'center'}}/>

              <input name="otp5" type="text" tabIndex="5" maxLength="1" style={{textAlign:'center'}}/>
            </form>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop:'20px'
          }}
        >
          <button
            className="btn btn-primary"
            type="submit"
            style={{ width: "30%" }}
          >
            Submit
          </button>
        </div>
      </Container>
    </>
  );
};

export default Otp;
