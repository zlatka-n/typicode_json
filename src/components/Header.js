import React from "react";
import "../css/Header.css";
import { AiOutlineHome } from "react-icons/ai";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-component">
      <header className="header-wrapper">
        <span id="home-icon">
          <Link to="/">
            <AiOutlineHome className="linkToUser homeIcon" />
          </Link>
        </span>
        <span id="people-icon">
          <Link to="/users">
            <IoPeopleCircleOutline className="linkToUser homeIcon" />
          </Link>
        </span>
      </header>
    </div>
  );
}

export default Header;
