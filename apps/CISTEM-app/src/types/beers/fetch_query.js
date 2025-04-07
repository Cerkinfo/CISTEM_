import { supabase } from "../../utils/supabase";

export const fetch_query = async () => {
  try {
    const { data, error } = await supabase
      .from('beers')
      .select(`
        id, name, volume, image,
        stock_beers(bottles_per_crate, stock_crates)
      `);

    if (error) throw new Error(`Erreur lors de la récupération des bières : ${error.message}`);

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
