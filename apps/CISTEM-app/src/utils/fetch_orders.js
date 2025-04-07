import { supabase } from "./supabase";

export const fetch_orders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, created_at, location(name), name, order, status
      `)

    if (error) throw new Error(`Erreur lors de la récupération des commandes : ${error.message}`);

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
