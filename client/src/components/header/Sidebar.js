import React from "react";
import { stack as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom';

export default props => {
    return (
        // Pass on our props
        <Menu {...props}>
            <Link className="menu-item" to="/">HOME</Link>
            <Link className="menu-item" to="/">ABOUT</Link>
            <Link className="menu-item" to="/profile">PROFILE</Link>
            <Link className="menu-item" to="/reviews">REVIEWS</Link>
        </Menu>
    );
};
