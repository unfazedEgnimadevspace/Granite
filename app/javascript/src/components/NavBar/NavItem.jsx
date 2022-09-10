/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */

// eslint-disable-next-line import/order
import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line arrow-body-style
const NavItem = ({ iconClass, name, path }) => {
  return (
    <Link
      to={path}
      className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5
      text-indigo-500 hover:text-indigo-500"
    >
      {iconClass && <i className={`${iconClass} text-bb-purple`}></i>}
      {name}
    </Link>
  );
};

export default NavItem;
