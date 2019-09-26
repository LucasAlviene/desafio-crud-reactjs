import React from 'react';
import Logo from '../../src/logo.png';
import {Link} from "react-router-dom";

export default () => {
    return (
        <nav className="blue-grey darken-4">
            <div className="container">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">
                        <img src={Logo} className="App-logo" alt="logo" />
                    </Link >
                </div>
            </div>
        </nav>
    );
}