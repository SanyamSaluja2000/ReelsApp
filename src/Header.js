import React from "react";
import "./Header.css";
import logo from './instagram.png';

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <img src={logo} alt="Icon" />
        <div className="brand_name">Instagram</div>
      </div>
    </div>
  );
}

export default Header;