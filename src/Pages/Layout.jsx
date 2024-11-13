import React from 'react';
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <div className="mt-24">
                <Outlet/>
            </div>

            <Footer/>

        </>
    );
};

export default Layout;