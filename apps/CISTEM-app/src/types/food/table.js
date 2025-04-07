import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { fetch_query } from "./fetch_query";
import { supabase } from "../../utils/supabase";

export default function () {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoods = async () => {
      const response = await fetch_query();
      if (response.success) {
        setFoods(response.data);
      } else {
        console.error(response.message);
      }
      setLoading(false);
    };

    getFoods();

    const subscription = supabase
    .channel('food-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'foods' },
      (payload) => {
        console.log("Changement détecté :", payload);
        setTimeout(() => {
            getFoods();
        }, 500);
      }
    )
    .subscribe();

    return () => {
        supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p>Chargement...</p>;

  if (foods.length === 0) return <p>Aucune nourriture en stock</p>;

  else {
    return (
        <>
        <Table striped>
            <thead style={{textAlign:"center"}}>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Entity/Box</th>
                <th>Stock Box</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody style={{textAlign:"center", verticalAlign:"middle"}}>
                {foods.map((food) => (
                    <tr key={food.id}>
                    <td><img src={food.image} alt={food.name} style={{height:"5rem"}}/></td>
                    <td>{food.name}</td>
                    <td>{food.stock_foods.entity_per_box}</td>
                    <td>{food.stock_foods.stock_box}</td>
                    <td>{food.stock_foods.entity_per_box * food.stock_foods.stock_box}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    );
  }
}