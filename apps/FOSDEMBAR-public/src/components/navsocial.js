import React from "react";
import { NavItem, NavLink, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SETTINGS from "../settings";
import { Facebook, Globe, Instagram } from "./icons";

export default ({ color }) => (
  <span className="navbar-nav ml-auto">
    {SETTINGS.contact.website && (
      <NavItem>
        <NavLink
          className="nav-link-icon"
          style={{ color: color }}
          href={SETTINGS.contact.website}
          id="websitetooltip"
          target="_blank"
        >
          <Globe size="1.8rem" />
          <span className="nav-link-inner--text d-lg-none ml-2" style={{marginLeft:"10px"}}>Website</span>
        </NavLink>
        <UncontrolledTooltip delay={0} target="websitetooltip">
          Visitez notre site web
        </UncontrolledTooltip>
      </NavItem>
    )}
  </span>
);
