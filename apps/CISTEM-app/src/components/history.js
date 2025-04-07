import React, { useEffect, useState } from "react";
import { Clock, Validate } from "./icons";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap";
import { H3 } from "./titles";
import { fetch_orders } from "../utils/fetch_orders";
import { supabase } from "../utils/supabase";
import { update_status } from "../utils/update_orders";
import moment from 'moment';

export default ({ location, show, toggle }) => {
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
    
        if (loading) return <p>Chargement...</p>;
    
        if (orders.length === 0) return <p>Aucune commande envoyée</p>;
    return (
        <>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle"}}>
            <Button outline color="primary" onClick={toggle} style={{display:'inline-flex'}}>
                <Clock size='25'/>
                <span style={{fontSize:'20px', margin:'0 0.8rem 0 0.8rem'}}>History</span>
            </Button>
        </div>

        <Modal isOpen={show}>
            <ModalHeader><Row>
                <Col>History {location}</Col>
                <Col><Button color="danger" onClick={toggle}>Close</Button></Col>
            </Row></ModalHeader>
            <ModalBody>
            <div>
                {orders.slice().reverse().map((order) => (
                    order.location.name === location && (
                <div>
                    <Row>
                    <Col><H3>{order.name}</H3></Col>
                    <Col><H3>{moment(order.created_at).format('ddd D HH:mm')}</H3></Col>
                    <Col md="2">{order.status === "PENDING" ? 
                        <Button color="warning">
                            ?
                        </Button> 
                        :
                        <Button color="success">
                            <Validate size="15"/>
                        </Button>}
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
                </div>
                )
                ))}
            </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        </>
    );
}