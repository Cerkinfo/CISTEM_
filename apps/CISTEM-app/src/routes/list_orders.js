import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Separator from "../components/separator";
import { fetch_orders } from "../utils/fetch_orders";
import { supabase } from "../utils/supabase";
import { Container, Row, Table, Col, Button } from "reactstrap";
import { H3 } from "../components/titles";
import moment from 'moment';
import { Validate } from "../components/icons";
import { update_status } from "../utils/update_orders";

export const Table_ = ({ order, handleAccept }) => {
    return (
        <Col md='2' style={{padding: "1rem", margin: "1rem"}} key={order.id}>
            <Row>
            <Col><H3>{order.name}</H3></Col>
            <Col><H3>{order.location.name}</H3></Col>
            <Col md="2">{order.status === "PENDING" ? 
                <Button color="success"
                onClick={() => handleAccept(order)}>
                    <Validate size="15"/>
                </Button> : null}
            </Col>
            </Row>
            <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
            <Table striped>
                <thead>
                <tr className="text-center">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Unity</th>
                    <th>Quantity</th>
                    <th>Product</th>
                </tr>
                </thead>
                <tbody>
                    {Object.keys(order.order).map((item) => {
                        let entity = order.order[item][1];
                        let type = order.order[item][0];
                        let unity = (type === 'beers' || type === 'softs') ? entity[`stock_${type}`].bottles_per_crate : entity[`stock_${type}`].entity_per_box;
                        return (
                            <tr key={entity.id} className="text-center">
                                <td><img src={entity.image} alt={entity.name} style={{width: "50px"}}/></td>
                                <td>{entity.name}</td>
                                <td>{unity}</td>
                                <td>{order.order[item][2]}</td>
                                <td>{unity * order.order[item][2]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            </div>
            <H3>{moment(order.created_at).format('ddd D HH:mm')}</H3>
        </Col>
    );
};


export default () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const getOrders = async () => {
        const response = await fetch_orders();
        if (response.success) {
            setOrders(response.data);
        } else {
            console.error(response.message);
        }
        setLoading(false);
        };

        getOrders();

        const subscription = supabase
        .channel('orders-changes')
        .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
            console.log("Changement détecté :", payload);
            setTimeout(() => {
                getOrders();
            }, 500);
        }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const handleAccept = async (order) => {

        console.log("Order:", order);
        const result = await update_status("SENDED", order.id);
        if (result.success) {
            console.log(result.message);
        } else {
            alert(`Erreur : ${result.message}`);
        }
    };

    if (loading) return <p>Chargement...</p>;

    if (orders.length === 0) return <p>Aucune commande reçue</p>;

    return (
        <>
        <Helmet><title>CISTEM - Orders List</title></Helmet>
        <Separator title="Orders List"/>

        <Row><Col md='6'><Separator title="Pending"/></Col></Row>
        <section className="section section-lg section-shaped pg-250 m-0">
        <Container fluid>
        <Row>
            {orders.slice().reverse().map((order) => {
                return order.status === "PENDING" ? (
                    <Table_ order={order} handleAccept={handleAccept} />
                ) : null;
            })}
        </Row>
        </Container>
        </section>

        <Row><Col md='6'><Separator title="Sended"/></Col></Row>
        <section className="section section-lg section-shaped pg-250 m-0">
        <Container fluid>
        <Row>
            {orders.slice().reverse().map((order) => {
                return order.status === "SENDED" ? (
                    <Table_ order={order} handleAccept={handleAccept} />
                ) : null;
            })}
        </Row>
        </Container>
        </section>
        </>
    );
};