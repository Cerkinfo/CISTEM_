import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { fetch_query } from "./fetch_query";
import { supabase } from "../../utils/supabase";
export default function () {
  const [softs, setSofts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSofts = async () => {
      const response = await fetch_query();
      if (response.success) {
        setSofts(response.data);
      } else {
        console.error(response.message);
      }
      setLoading(false);
    };

    getSofts();

    const subscription = supabase
    .channel('soft-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'softs' },
      (payload) => {
        console.log("Changement détecté :", payload);
        setTimeout(() => {
            getSofts();
        }, 500);
      }
    )
    .subscribe();

    return () => {
        supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p>Chargement...</p>;

  if (softs.length === 0) return <p>Aucun soft en stock</p>;

  else {
    return (
        <>
        <Table striped>
            <thead style={{textAlign:"center"}}>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Volume</th>
                <th>Bottles/Crate</th>
                <th>Stock Crates</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody style={{textAlign:"center", verticalAlign:"middle"}}>
                {softs.map((soft) => (
                    <tr key={soft.id}>
                    <td><img src={soft.image} alt={soft.name} style={{height:"5rem"}}/></td>
                    <td>{soft.name}</td>
                    <td>{soft.volume} cl</td>
                    <td>{soft.stock_softs.bottles_per_crate}</td>
                    <td>{soft.stock_softs.stock_crates}</td>
                    <td>{soft.stock_softs.bottles_per_crate * soft.stock_softs.stock_crates}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    );
  }
}