import React from "react";
import { H1, Subtitle } from "./titles.js";
import {
  Col,
  Row
} from "reactstrap";

const Banner = () => {
  return (
    <section
      className="ui-section -hero section section-lg section-shaped pg-250 color-main m-0"
      style={{
        "background-size": "cover",
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        height: "calc(100vh - 78px)",
      }}
    >
      <Row className="align-items-center h-100 w-100 color-main m-0">
        <Col lg="6" sm="12">
          <div className="ui-aside text-white">
            <h1 className="ui-heading">
              <span className="ui-heading-inner">
                <H1> Welcome @ FOSDEM Bar</H1>
              </span>
            </h1>
            <Subtitle
              style={{ paddingRight: "40px" }}
              className="text-end fade-in"
            >
              Maintained by Cercle Informatique de l'ULB
              <br/><br/>
              Have a nice FOSDEM 2025 ❤️
            </Subtitle>
          </div>
        </Col>
        <Col lg="6" sm="12" className="w-50 text-center">
          <br/>
          <img
            className="img-fluid fade-in"
            style={{ padding: "0 50px",
              maxWidth: `${window.innerWidth < 768 ? "50vh" : "80vh"}`
            }}
            src={require("@repo/ui/fosdem2025")}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Banner;