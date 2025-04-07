import React from "react";
import Headroom from "react-headroom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import NavSocial from "./navsocial";

const NavLink = ({ to, children }) => (
  <NavHashLink activeClassName="" className="font-white nav-link" to={to} style={{margin: "1rem"}}>
    {children}
  </NavHashLink>
);

export default () => {
  return (
    <Headroom>
      <Navbar
        className="navbar-main navbar-transparent navbar-light headroom"
        expand="lg"
        id="navbar-main"
        style={{fontSize:"20px"}}
      >
        <NavbarBrand to="/">
          <Link to="/">
            <img alt="FOSDEM Bar" src={require("@repo/ui/fosdem_ci_white")} style={{width:"5rem"}}/>
          </Link>
        </NavbarBrand>
        <button className="navbar-toggler" id="navbar_global">
          <span className="navbar-toggler-icon" />
        </button>
        <UncontrolledCollapse navbar toggler="#navbar_global">
          <Nav className="align-items-auto m-auto" navbar></Nav>
              <NavLink to="/#news">News</NavLink>
              <NavLink to="/#beers">Beers</NavLink>
              <NavLink to="/#softs">Softs</NavLink>
              <NavLink to="/#coffee">Coffee</NavLink>
              <NavLink to="/#foods">Foods</NavLink>
              <NavLink to="/#location">Locations</NavLink>
            <NavSocial color="white" />
        </UncontrolledCollapse>
      </Navbar>
    </Headroom>
  );
};
