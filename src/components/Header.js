import React from "react";
import "../css/Header.css";
import { AiOutlineHome } from "react-icons/ai";
import { IoPeopleCircleOutline } from "react-icons/io5";

function Header() {
  return (
    <div className="header-component">
      <header className="header-wrapper">
        <span id="home-icon">
          <AiOutlineHome />
        </span>
        <span id="people-icon">
          <IoPeopleCircleOutline />
        </span>
      </header>
    </div>
  );
}

export default Header;
