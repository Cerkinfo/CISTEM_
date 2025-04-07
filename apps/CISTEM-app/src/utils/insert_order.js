import { supabase } from "./supabase";

export const insert_order = async (order, location, order_name) => {
  try {
    for (const item of order) {
        const [type, entity, quantity] = item;
  
        if (type === 'beers') {
          const { data: stockData, error: stockError } = await supabase
            .from('stock_beers')
            .select('stock_crates')
            .eq('id', entity.id)
            .single();
  
          if (stockError) {
            throw new Error(`Erreur lors de la récupération du stock pour la bière ${entity.name} : ${stockError.message}`);
          }
  
          let stockCrates = parseInt(stockData.stock_crates, 10);
          let quantityToDecrement = Math.min(stockCrates, quantity);
  
          if (quantityToDecrement > 0) {
            const { data: updateData, error: updateError } = await supabase
              .from('stock_beers')
              .update({ stock_crates: stockCrates - quantityToDecrement })
              .eq('id', entity.id);
  
            if (updateError) {
              throw new Error(`Erreur lors de la mise à jour du stock pour la bière ${entity.name} : ${updateError.message}`);
            }
          }
        } else if (type === 'softs') {
            const { data: stockData, error: stockError } = await supabase
              .from('stock_softs')
              .select('stock_crates')
              .eq('id', entity.id)
              .single();
    
            if (stockError) {
              throw new Error(`Erreur lors de la récupération du stock pour le soft ${entity.name} : ${stockError.message}`);
            }
    
            let stockCrates = parseInt(stockData.stock_crates, 10);
            let quantityToDecrement = Math.min(stockCrates, quantity);
    
            if (quantityToDecrement > 0) {
              const { data: updateData, error: updateError } = await supabase
                .from('stock_softs')
                .update({ stock_crates: stockCrates - quantityToDecrement })
                .eq('id', entity.id);
    
              if (updateError) {
                throw new Error(`Erreur lors de la mise à jour du stock pour le soft ${entity.name} : ${updateError.message}`);
              }
            }
        } else if (type === 'foods') {
            const { data: stockData, error: stockError } = await supabase
              .from('stock_foods')
              .select('stock_box')
              .eq('id', entity.id)
              .single();
    
            if (stockError) {
              throw new Error(`Erreur lors de la récupération du stock pour la nourriture ${entity.name} : ${stockError.message}`);
            }
    
            let stockBox = parseInt(stockData.stock_box, 10);
            let quantityToDecrement = Math.min(stockBox, quantity);
    
            if (quantityToDecrement > 0) {
              const { data: updateData, error: updateError } = await supabase
                .from('stock_foods')
                .update({ stock_box: stockBox - quantityToDecrement })
                .eq('id', entity.id);
    
              if (updateError) {
                throw new Error(`Erreur lors de la mise à jour du stock pour la nourriture ${entity.name} : ${updateError.message}`);
              }
            }
        } else if (type === 'materials') {  
            const { data: stockData, error: stockError } = await supabase
              .from('stock_materials')
              .select('stock_box')
              .eq('id', entity.id)
              .single();
    
            if (stockError) {
              throw new Error(`Erreur lors de la récupération du stock pour le matériel ${entity.name} : ${stockError.message}`);
            }
    
            let stockBox = parseInt(stockData.stock_box, 10);
            let quantityToDecrement = Math.min(stockBox, quantity);
    
            if (quantityToDecrement > 0) {
              const { data: updateData, error: updateError } = await supabase
                .from('stock_materials')
                .update({ stock_box: stockBox - quantityToDecrement })
                .eq('id', entity.id);
    
              if (updateError) {
                throw new Error(`Erreur lors de la mise à jour du stock pour le matériel ${entity.name} : ${updateError.message}`);
              }
            }
        }
    }

    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('id, orders')
      .eq('name', location)
      .single();

    if (locationError) {
        throw new Error(`Erreur lors de la récupération des données de l'emplacement ${location} : ${locationError.message}`);
    }

    const locationId = locationData.id;

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          location: locationId,
          name: order_name,
          order: order,
          status: 'PENDING',
        },
      ])
      .select()
      .single();

    if (orderError) {
      throw new Error(`Erreur lors de l'insertion dans 'orders' : ${orderError.message}`);
    }

    const { data: updatedLocationData, error: updatedLocationError } = await supabase
      .from('locations')
      .update({ orders: locationData.orders + 1 })
      .eq('id', locationId)
      .select()
      .single();

    if (updatedLocationError) {
        throw new Error(`Erreur lors de la récupération des données de l'emplacement ${location} : ${updatedLocationError.message}`);
    }

    return { success: true, message: 'Commande envoyée avec succès !' };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
