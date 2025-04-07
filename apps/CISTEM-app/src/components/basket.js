import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { BasketIcon } from "./icons";
import { find_location } from "../utils/find_location";
import { insert_order } from "../utils/insert_order";

export const Basket = ({ location, show, toggle, order, setOrder, addToOrder, removeFromOrder, getToOrder }) => {
    const [location_data, setLocationData] = useState({});

    useEffect(() => {
        const getLocationData = async () => {
          const response = await find_location(location);
          if (response.success) {
            setLocationData(response.data);
          } else {
            console.error(response.message);
          }
        };
    
        getLocationData();
    }, [location]);

    const formatOrderNumber = (prefix, orderNumber) => {
        return `${prefix}-${String(orderNumber).padStart(3, '0')}`;
    };

    const order_name = formatOrderNumber(location_data.prefix, location_data.orders + 1)

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Order:", order);
        const result = await insert_order(order, location, order_name);
        if (result.success) {
            console.log(result.message);
            setOrder([]);
            toggle();
        } else {
            alert(`Erreur : ${result.message}`);
        }
    };

    return (
        <>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle"}}>
            <Button outline color="success" onClick={toggle} style={{display:'inline-flex'}}>
                <BasketIcon size='25'/>
                <span style={{fontSize:'20px', margin:'0 0.8rem 0 0.8rem'}}>Order</span>
            </Button>
        </div>

        <Modal isOpen={show}>
            <ModalHeader>Order : {order_name}</ModalHeader>
            <ModalBody>
                {order && order.length > 0 ? 
                (<Table striped>
                    <thead>
                        <tr className="text-center">
                            <th>Image</th>
                            <th>Name</th>
                            <th>Unity</th>
                            <th>Quantity</th>
                            <th>Product</th>
                        </tr>
                    </thead>
                    {order.map((item) => {
                        let unity = (item[0] === 'beers' || item[0] === 'softs') ? item[1][`stock_${item[0]}`].bottles_per_crate : item[1][`stock_${item[0]}`].entity_per_box;
                        unity = parseInt(unity, 10);
                        const quantity = parseInt(item[2], 10);
                        return (
                            <tr key={item[1].id} className="text-center">
                                <td><img src ={item[1].image} alt={item[1].name} style={{height:'50px'}}/></td>
                                <td>{item[1].name}</td>
                                <td>{unity.toString()}</td>
                                <td>{quantity}</td>
                                <td>{unity * quantity}</td>
                            </tr>
                        );
                    })}
                </Table>)
                : (<p>Le panier est vide.</p>)}
            </ModalBody>
            <ModalFooter>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle"}}>
                    <Button color="danger" onClick={toggle}>Close</Button>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle"}}>
                    <Button color="success" onClick={handleSubmit} disabled={order.length === 0 ? true : false}>Order</Button>
                </div>
            </ModalFooter>
        </Modal>
        </>
    );
};

export const useBasket = () => {
    const [order, setOrder] = useState([]);

    const getToOrder = (item) => {
        let find = false;
        if (order.length > 0) {
            for (let i = 0; i < order.length; i++) {
                if (order[i][1] === item) {
                    return order[i][2].toString();
                }
            }
            if (!find) return 0;
        } else return 0;
    };

    const addToOrder = (type, item) => {
        let find = false;
        for (let i = 0; i < order.length; i++) {
            if (order[i][1] === item) {
                setOrder([...order.slice(0, i), [type, item, order[i][2] + 1], ...order.slice(i + 1)]);
                find = true;
            }
        }
        if(!find) setOrder([...order, [type, item, 1]]);
    };

    const removeFromOrder = (type, item) => {
        for (let i = 0; i < order.length; i++) {
            if (order[i][1] === item) {
                if (order[i][2] === 1) {
                    setOrder([...order.slice(0, i), ...order.slice(i + 1)]);
                } else {
                    setOrder([...order.slice(0, i), [type, item, order[i][2] - 1], ...order.slice(i + 1)]);
                }
            }
        }
    };

    return { order, setOrder, addToOrder, removeFromOrder, getToOrder };
};