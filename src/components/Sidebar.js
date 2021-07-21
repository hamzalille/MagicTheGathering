import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

const Slidebar = (props) => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Histoire
      </a>
      <a className="menu-item" href="/">
        Règles
      </a>
      <a className="menu-item" href="/">
        Cartes
      </a>
      <a className="menu-item" href="/">
        Créer
      </a>
      <a className="menu-item" href="/">
        Booster
      </a>
    </Menu>
  );
};

export default Slidebar;
