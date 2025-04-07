import React from "react";
import { Col, Row } from "reactstrap";
import { Overlay } from "./images";

export const Double = ({ children, img, id, width }) => {
  return (
    <div className="h-100" id={id}>
        <Row className="align-items-center justify-content-center">
            <Col lg="6" className="d-flex justify-content-center">
                <Overlay>
                    <img
                        src={require(`../assets/img/${img}`)}
                        style={{ width: width ? width : "100%", display: 'block', margin: '0 auto' }}
                    />
                </Overlay>
            </Col>
            <Col lg="6">
                {children}
            </Col>
        </Row>
    </div>
  );
}