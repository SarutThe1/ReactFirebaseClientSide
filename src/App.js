import Headers from "./components/layouts/Headers";

//Router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Secret from "./components/pages/Secret";

//User pages
import MyProfile from "./components/pages/user/MyProfile";

//admin pages
import HomeAdmin from "./components/pages/admin/Home";
import UserManage from "./components/pages/admin/UserManage";
import GoogleUserManage from "./components/pages/admin/GoogleUserManage";

//Check user login
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import { auth } from "./components/firebase";

//function
import { currentUser, currentNormUser } from "./components/functions/auth";

//Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  const dispatch = useDispatch();

  const idtoken = localStorage.token;
  if (idtoken) {
    currentNormUser(idtoken)
      .then((res) => {
        dispatch(
          login({
            email: res.data.email,
            name: res.data.username,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            telephone: res.data.telephone,
            token: idtoken,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

          {/* admin */}
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomeAdmin />
              </AdminRoute>
            }
          ></Route>

          <Route
            path="/admin/user-manage"
            element={
              <AdminRoute>
                <UserManage />
              </AdminRoute>
            }
          ></Route>

          <Route
            path="/admin/google-user-manage"
            element={
              <AdminRoute>
                <GoogleUserManage />
              </AdminRoute>
            }
          ></Route>

          {/* User login route */}
          <Route
            path="/secret"
            element={
              <UserRoute>
                <Secret />
              </UserRoute>
            }
          ></Route>

          <Route
            path="/myprofile"
            element={
              <UserRoute>
                <MyProfile />
              </UserRoute>
            }
          ></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
