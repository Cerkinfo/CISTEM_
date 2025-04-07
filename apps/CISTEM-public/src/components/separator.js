import React from "react";
import { H1 } from "./titles.js";
import { Col, Row } from "reactstrap";
import styled from "styled-components";

export const Sep = styled.div`
  color: main;
  @media {
    padding: 20px 15px;
  }
`;

export const Line = styled.div`
  @media {
    padding: 5px 10px;
  }
`;

const Separator = ({ title }) => {
  return (
    <section className="section section-lg section-shaped pg-250 m-0">
      <Sep className="h-100 font-light">
        <Row className="align-items-center text-center w-100">
          <Col style={{display:'flex', justifyContent:'flex-end'}}><Line className="w-50 color-light"/></Col>
          <Col><H1 className="w-100">{title}</H1></Col>
          <Col><Line className="w-50 color-light" /></Col>
        </Row>
      </Sep>
    </section>
  );
};

export default Separator;