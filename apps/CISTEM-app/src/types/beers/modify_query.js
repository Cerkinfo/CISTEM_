import { supabase } from "../../utils/supabase";

export const updateStockCrates = async (beerId, newStock) => {
  try {
    const { error } = await supabase
      .from("stock_beers")
      .update({ stock_crates: newStock })
      .eq("id", beerId);

    if (error) throw new Error(`Erreur lors de la mise à jour du stock : ${error.message}`);

    return { success: true, message: "Stock mis à jour avec succès" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
