import { supabase } from "./supabase";

export const find_location = async ( location ) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select(`
        id, name, prefix, orders
      `)
      .eq('name', location)
      .single();

    if (error) throw new Error(`Erreur lors de la récupération de l'emplacement : ${error.message}`);

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
