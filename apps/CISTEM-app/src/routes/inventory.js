import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Separator from "../components/separator";
import { Center } from "../components/titles";
import { Button, Col, Row } from "reactstrap";
import { BeerModal, BeerTable } from "../types/beers/";
import { SoftModal, SoftTable } from "../types/softs/";
import { FoodModal, FoodTable } from "../types/food/";
import { MaterialModal, MaterialTable } from "../types/material/";

export default () => {
    const [isBeersModal, setBeersModal] = useState(false);
    const [isSoftsModal, setSoftsModal] = useState(false);
    const [isFoodModal, setFoodModal] = useState(false);
    const [isMaterialModal, setMaterialModal] = useState(false);

    const handleModal = (type) => {
        if (type === "Beers") setBeersModal(!isBeersModal);
        if (type === "Softs") setSoftsModal(!isSoftsModal);
        if (type === "Food") setFoodModal(!isFoodModal);
        if (type === "Material") setMaterialModal(!isMaterialModal);
    };

    const types = {
        "Beers": { boolean: isBeersModal, modal: BeerModal, table: BeerTable},
        "Softs" : { boolean: isSoftsModal, modal : SoftModal, table: SoftTable}, 
        "Food" : { boolean: isFoodModal, modal : FoodModal, table: FoodTable}, 
        "Material" : { boolean: isMaterialModal, modal : MaterialModal, table: MaterialTable},
    };

    return (
        <>
        <Helmet><title>CISTEM - Inventory</title></Helmet>
        <Separator title="Admin Console"/>
        <section className="section section-lg section-shaped pg-250 m-0">
        <Center>
            {Object.keys(types).map((type) => {
                const TableComponent = types[type].table;
                return (
                    <>
                    <Row key={type}>
                        <Col md={{ offset: 0, size: 6 }} sm="12">
                            <Separator title={type}/>
                        </Col>
                        <Col className="d-flex align-items-center">
                            <Button color="success" outline onClick={() => handleModal(type)} style={{padding:"0.5rem 3rem 0.5rem 3rem"}}>
                                Add
                            </Button>
                        </Col>
                    </Row>
                    {TableComponent && <TableComponent />}
                    </>
                );
            })}
        </Center>
        </section>
        {Object.keys(types).map((type) => {
            const ModalComponent = types[type].modal;
            return (
                ModalComponent && <ModalComponent key={type} show={types[type].boolean} close={() => handleModal(type)}/>
            );
        })}
        </>
    );
};