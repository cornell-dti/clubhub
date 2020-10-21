import React from "react";
import "./Header.css";

const header = () => {
  return (
    <div className="Header">
      <ul>
        <li><a href="#signin">Sign In</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </div>
  );
};

export default header;
