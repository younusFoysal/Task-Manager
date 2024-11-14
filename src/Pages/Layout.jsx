import React from 'react';
import Navbar from "../Components/Navbar.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <div className="mt-24">
                <Outlet/>
            </div>


        </>
    );
};

export default Layout;