import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Separator from "../components/separator";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import { supabase } from "../utils/supabase";
import { Basket, useBasket } from "../components/basket";

import { BeerFetch } from "../types/beers/";
import { SoftFetch } from "../types/softs/";
import { FoodFetch } from "../types/food/";
import { MaterialFetch } from "../types/material/";
import { LOCATIONS } from "../App";
import History from "../components/history";

export default () => {
    const location = LOCATIONS.find(loc => loc.path.toLowerCase() === window.location.pathname).name;

    const [beers, setBeers] = useState([]);
    const [softs, setSofts] = useState([]);
    const [foods, setFoods] = useState([]);
    const [material, setMaterial] = useState([]);

    const types = {
        "beers": { data: beers, fetch: BeerFetch, set: setBeers },
        "softs" : { data: softs , fetch: SoftFetch, set: setSofts },
        "foods" : { data: foods, fetch: FoodFetch, set: setFoods },
        "materials" : { data: material, fetch: MaterialFetch, set: setMaterial },
    };

    const [isBasket, setShowBasket] = useState(false);
    const handleBasket = () => setShowBasket(!isBasket);
    const [isHistory, setShowHistory] = useState(false);
    const handleHistory = () => setShowHistory(!isHistory);

    const { order, setOrder, addToOrder, removeFromOrder, getToOrder } = useBasket();

    useEffect(() => {
        {Object.keys(types).map((type) => {
            const getItems = async () => {
                const response = await types[type].fetch();
                if (response.success) {
                    types[type].set(response.data);
                } else {
                    console.error(response.message);
                }
            };
            getItems();

            const subscription = supabase
            .channel(`${type}-changes`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'stock_'+type },
                (payload) => {
                    console.log("Changement détecté :", payload);
                    setTimeout(() => {
                        getItems();
                    }, 500);
                }
            )
            .subscribe();

            return () => {
                supabase.removeChannel(subscription);
            };
        })}
    }, []);

    return (
        <>
        <Helmet><title>CISTEM - {location}</title></Helmet>
        <Row style={{position:'sticky', top:0, zIndex:1000, backgroundColor:'white'}}>
            <Col md='1' sm='1' style={{display:'inline-flex'}}><History location={location} show={isHistory} toggle={handleHistory}/></Col>
            <Col md='10' sm='10'><Separator title={location}/></Col>
            <Col md='1' sm='1' style={{display:'inline-flex'}}><Basket location={location} show={isBasket} toggle={handleBasket} order={order} setOrder={setOrder} addToOrder={addToOrder} removeFromOrder={removeFromOrder} getToOrder={getToOrder} /></Col>
        </Row>
        <section className="section section-lg section-shaped pg-250 m-0">
        <Container fluid>
            {Object.keys(types).map((type) => {
                const fetch = types[type].fetch;
                return (
                    <>
                    <Row key={type}>
                        <Col md={{ offset: 3, size: 6 }} sm="12">
                            <Separator title={type}/>
                        </Col>
                    </Row>
                    <Row>
                    {types[type].data.map((item) => {
                        let stock = (type === 'beers' || type === 'softs') ? item[`stock_${type}`].stock_crates : item[`stock_${type}`].stock_box;
                        let quantity = getToOrder(item)
                        return (
                            <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} key={item.id}>
                                <Card style={{width:"15rem"}}>
                                    <div style={{height:"10rem", objectFit: 'contain', overflow: 'hidden', verticalAlign: 'middle', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <img src={item.image} alt={item.name} style={{width:"100%", opacity: stock <= 0 ? 0.5: 1}}/>
                                    </div>
                                    <CardBody>
                                        <CardTitle tag="h5">{item.name}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">{item.volume}
                                            {type === 'beers' || type === 'softs' ? 'cl x '+item[`stock_${type}`].bottles_per_crate : 'x '+item[`stock_${type}`].entity_per_box   
                                        }</CardSubtitle>
                                        <CardText>
                                            Stock: {stock}
                                        </CardText>
                                        {stock > 0 ?
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Button color="danger" outline onClick={() => removeFromOrder(type, item)} disabled={quantity === 0 ? true : false}>-</Button>
                                            <div style={{padding:'0 1rem 0 1rem', fontSize:'18px'}}>{quantity}</div>
                                            <Button color="success" outline onClick={() => addToOrder(type, item)} disabled={quantity >= stock ? true : false}>+</Button>
                                            </div>
                                        : null}
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                    </Row>
                    </>
                );
            })}
        </Container>
        </section>
        </>
    )
};