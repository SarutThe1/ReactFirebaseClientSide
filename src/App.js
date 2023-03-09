
import Headers from "./components/layouts/Headers";

//Router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Secret from "./components/pages/Secret";

//Check user login
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import { auth } from "./components/firebase";

//function
import { currentUser } from "./components/functions/auth";

//Routes
import UserRoute from "./components/routes/UserRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();

        currentUser(idToken.token)
          .then((res) => {
            console.log("res", res.data);
            //send to redux
            dispatch(
              login({
                email: res.data.email,
                name: res.data.name,
                token: idToken.token,
              })
            );
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Headers />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* Private */}
          <Route
            path="/secret"
            element={
              <UserRoute>
                <Secret />
              </UserRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
