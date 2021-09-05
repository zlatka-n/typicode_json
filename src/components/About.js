import React from "react";
import "../css/about.css";

function About() {
  return (
    <div className="about-component">
      <div className="about-wrapper">
        <section className="section">
          <h3 className="about-title">About</h3>
          Hello,
          <p className="about-text">
            thank you for visiting this page. I used &nbsp;
            <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder</a>
            &nbsp; for fetching data. The inspiration for layout of this website
            comes from Facebook and Twitter. Below, I include my tech stack. You
            can also visit my <a href="https://github.com/zlatka-n">GitHub</a>.
            In case you would like to reach me out, don't hesitate to contact me
            by email <strong>zlatka094@seznam.cz</strong> or phone{" "}
            <strong>+420 735 204 082</strong>.
          </p>
          Kind Regards,
          <br /> Zlatka
        </section>
        <section className="section">
          <h3 className="about-title">Used tech stack</h3>
          <ul className="techStack">
            <li>React</li>
            <li>Axios</li>
            <li>React Router DOM</li>
            <li>Lodash</li>
            <li>React Icons</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About;
