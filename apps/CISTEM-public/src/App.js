import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Helmet from "react-helmet";
import {
  Home,
  NotFound,
  Schedules
} from "./routes";

import "./assets/css/style.scss";

export default () => {
  return (
    <Router basename="/">
        <Helmet></Helmet>

        <Routes>
          <Route exact path="/"
            element = {<Home />} />
          <Route path="/schedule/:type"
            element = {<Schedules /> } />
            <Route path="/schedule/:type/:param"
              element = {<Schedules /> } />
          <Route path="*"
              element = {<NotFound />} />
        </Routes>
    </Router>
  );
};
