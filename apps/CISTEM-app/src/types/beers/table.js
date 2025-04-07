import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { fetch_query } from "./fetch_query";
import { supabase } from "../../utils/supabase";

export default function () {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getBeers = async () => {
      const response = await fetch_query();
      if (response.success) {
        setBeers(response.data);
      } else {
        console.error(response.message);
      }
      setLoading(false);
    };

    getBeers();

    const subscription = supabase
    .channel('beer-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'beers' },
      (payload) => {
        console.log("Changement détecté :", payload);
        setTimeout(() => {
            getBeers();
        }, 500);
      }
    )
    .subscribe();

    return () => {
        supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p>Chargement...</p>;

  if (beers.length === 0) return <p>Aucune bière en stock</p>;

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
                {beers.map((beer) => (
                    <tr key={beer.id}>
                    <td><img src={beer.image} alt={beer.name} style={{height:"5rem"}}/></td>
                    <td>{beer.name}</td>
                    <td>{beer.volume} cl</td>
                    <td>{beer.stock_beers.bottles_per_crate}</td>
                    <td>{beer.stock_beers.stock_crates}</td>
                    <td>{beer.stock_beers.bottles_per_crate * beer.stock_beers.stock_crates}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    );
  }
}