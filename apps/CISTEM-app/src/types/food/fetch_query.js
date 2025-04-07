import { supabase } from "../../utils/supabase";

export const fetch_query = async () => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select(`
        id, name, image,
        stock_foods(entity_per_box, stock_box)
      `);

    if (error) throw new Error(`Erreur lors de la récupération des nourritures : ${error.message}`);

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
