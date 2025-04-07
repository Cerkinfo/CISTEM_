import React from "react";
import { Col, Row } from "reactstrap";
import { Overlay } from "./images";
import { Center } from "./titles";

export const Double = ({ children, img, id, width }) => {
const isSmall = window.innerWidth < 768;
  return (
    <div className="h-100" id={id}>
        <Row className="align-items-center justify-content-center">
            <Col lg="6" className="d-flex justify-content-center">
                <Overlay>
                    <img
                        src={require(`../assets/img/${img}`)}
                        style={{
                          display: 'inline-block',
                          margin: '0 auto',
                          width: width || '100%',
                          height: '500px',
                          objectFit: 'contain'
                        }}
                    />
                </Overlay>
            </Col>
            <Col lg="6">
                <Center>
                    <div style={{
                        height: isSmall ? "100%" : '500px'
                    }}>
                        {children}
                    </div>
                </Center>
            </Col>
        </Row>
    </div>
  );
}