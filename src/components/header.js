import React from "react";
import Logo from '../img/github.svg';

const Header = () => {
    return (
        <div className="header">
            <img 
                src={Logo} 
                className="logo" 
                alt="GitTaira" 
            />
        </div>
    )
}

export default Header