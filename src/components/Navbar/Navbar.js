import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <div className="title">
          <Link to="/" className="link">
            My Contact Book
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
