import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Helmet from "react-helmet";
import {
  Home,
  NotFound
} from "./routes";

import "@repo/ui/style.scss";

export default () => {
  return (
    <Router basename="/">
        <Helmet></Helmet>

        <Routes>
          <Route exact path="/"
            element = {<Home />} />
          <Route path="*"
              element = {<NotFound />} />
        </Routes>
    </Router>
  );
};
