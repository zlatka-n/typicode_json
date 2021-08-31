import React from "react";
import "../css/Footer.css";
function Footer() {
  return (
    <div className="footer-component">
      <footer className="footer-wrapper">
        <div className="contacts">
          Contacts
          <div>Email: zlatka094@seznam.cz</div>
          <div>Phone: +420 735 204 082</div>
        </div>
        <div className="explore">
          Explore
          <div>About</div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
