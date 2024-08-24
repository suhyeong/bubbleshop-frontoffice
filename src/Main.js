import "./Main.css";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import {Route, Routes} from "react-router-dom";
import JoinUs from "./JoinUs";
import Login from "./Login";
import React from "react";

function Main() {
    return (
        <div className='main-div'>
            <MainHeader />
            <div className='main-content'>
                <Routes>
                    <Route path='/join' element={<JoinUs />} />
                    <Route path='login' element={<Login />} />
                </Routes>
            </div>
            <MainFooter />
        </div>
    );
}

export default Main;