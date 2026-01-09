import "./Main.css";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import {Route, Routes} from "react-router-dom";
import React from "react";
import OAuthCallback from "./login/OAuthCallback";
import Login from "./login/Login";

function Main() {
    return (
        <div className='main-div'>
            <MainHeader />
            <div className='main-content'>
                <Routes>
                    <Route path='/' />
                    <Route path='/login' element={<Login />} />
                    <Route path='/oauth-callback' element={<OAuthCallback />} />
                </Routes>
            </div>
            <MainFooter />
        </div>
    );
}

export default Main;