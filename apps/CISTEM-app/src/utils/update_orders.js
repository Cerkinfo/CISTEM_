import { supabase } from "./supabase";

export const update_status = async (status, orderId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: status })
      .eq('id', orderId)
      .single()

    if (error) throw new Error(`Erreur lors de la mise à jour du status : ${error.message}`);

    return { success: true, message : `Commande ${orderId} mise à jour avec succès` };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
