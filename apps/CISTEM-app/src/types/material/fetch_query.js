import { supabase } from "../../utils/supabase";

export const fetch_query = async () => {
  try {
    const { data, error } = await supabase
      .from('materials')
      .select(`
        id, name, image,
        stock_materials(entity_per_box, stock_box)
      `);

    if (error) throw new Error(`Erreur lors de la récupération des matériaux : ${error.message}`);

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
