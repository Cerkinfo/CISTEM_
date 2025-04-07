import React from "react";
import { H1, Subtitle } from "./titles.js";
import {
  Col,
  Row
} from "reactstrap";
import "../assets/css/hero.scss"

const Banner = () => {
  return (
    <section
      className="ui-section -hero section section-lg section-shaped pg-250 color-main m-0"
      style={{
        "background-size": "cover",
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover"
      }}
    >
      <Row className="align-items-center h-100 w-100 color-main m-0">
        <Col lg="6" sm="12">
          <div className="ui-aside text-white">
            <h1 className="ui-heading">
              <span className="ui-heading-inner">
                <H1>Hello les bénévoles !</H1>
              </span>
            </h1>
            <Subtitle
              style={{ paddingRight: "40px" }}
              className="text-end fade-in"
            >
              Merci de votre aide pour ce FOSDEM 2025 ❤️
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
            src={require("../assets/img/fosdem2025.png")}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Banner;