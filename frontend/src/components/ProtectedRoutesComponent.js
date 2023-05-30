import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";

import axios from "axios";
import React, { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage";


const ProtectedRoutesComponent = ({ admin }) => {

    const [isAuth, setIsAuth] = useState(); //Initially Authentication is set to an object.

    // After successful Login, directed to api/get-token for cookie then continue to using the appropiate authorized routes:
    useEffect(() => {
        axios.get("/api/get-token").then(function (data) {
            if (data.data.token) {
                setIsAuth(data.data.token);
            }
            return isAuth;
        })
    }, [isAuth])

    // User Not Logged in, Redirect to Loginpage:
    if (isAuth === undefined) return <LoginPage />

    // Login Logic:
    return isAuth && admin && isAuth !== "admin" ? (    // If User is Logged in and is NOT Admin...:
        <Navigate to="/login" />        // ...Redirect to login route...:
    ) : isAuth && admin ? (// ...Otherwise, if user Is logged and Admin, Show all the admin protected routes.
        <Outlet />
    ) : isAuth && !admin ? ( //If User is logged and is not an admin (regular User)..then show User Chat and User Routes...
        <>
            <UserChatComponent />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" /> //...Otherwise, if all else, redirect to login page.
    )
};

export default ProtectedRoutesComponent;