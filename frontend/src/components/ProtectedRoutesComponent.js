import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";

import axios from "axios";
import React, { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage";


const ProtectedRoutesComponent = ({ admin }) => {

    const [isAuth, setIsAuth] = useState();

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