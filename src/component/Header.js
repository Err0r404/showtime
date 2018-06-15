import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container">
                <NavLink className="navbar-brand" to="/" exact={true}>
                    <img src="/logo.svg" width="25" height="25" className="d-inline-block align-top mr-1" alt=""/>
                    Cinemas
                </NavLink>
            </div>
        </nav>
    );
};

export default Header;