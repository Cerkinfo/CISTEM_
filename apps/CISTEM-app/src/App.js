import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Helmet from "react-helmet";
import {
  Inventory,
  Order,
  ListOrders
} from "./routes";

import "@repo/ui/style.scss";

export const LOCATIONS = [
  { name: "Campouce", path: "/campouce" },
  { name: "Chez Théo", path: "/chez_theo" },
  { name: "Foyer Culturel", path: "/foyer_culturel" },
  { name: "Hall U.D", path : "/hall_ud" },
  { name : "Cerkinfo", path : "/cerkinfo" },
];

export default () => {
  return (
    <Router>
        <Helmet></Helmet>

        <Routes>
          <Route exact path="/admin"
            element = {<Inventory />} />
          <Route exact path="/orders"
            element = {<ListOrders />} />
          {LOCATIONS.map((location) => (
            <Route exact path={location.path}
              element = {<Order />} />
          ))}
        </Routes>
    </Router>
  );
};
