import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer-component">
      <footer className="footer-wrapper">
        <div className="contacts">
          <div className="title-footer">Contacts</div>
          <div className="text-footer">Email: zlatka094@seznam.cz</div>
          <div className="text-footer">Phone: +420 735 204 082</div>
        </div>
        <div className="explore">
          <div className="title-footer">Explore</div>
          <Link to="/about">
            <div className="text-footer">About</div>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
