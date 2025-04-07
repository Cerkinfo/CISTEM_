import { supabase } from "../../utils/supabase";

export const insert_query = async (formData) => {
  try {
    const { data: publicUrlData } = supabase.storage.from('soft-images').getPublicUrl('/'+formData.Image);
    let imageUrl = publicUrlData.publicUrl;

    const { data: softData, error: softError } = await supabase
      .from('softs')
      .insert([
        {
          name: formData.Name,
          volume: parseFloat(formData.Volume),
          image: imageUrl,
          price: parseFloat(formData.Price),
        },
      ])
      .select()
      .single();

    if (softError) {
      throw new Error(`Erreur lors de l'insertion dans 'soft' : ${softError.message}`);
    }

    const softId = softData.id;

    const { error: stockError } = await supabase.from('stock_softs').insert([
      {
        id: softId,
        bottles_per_crate: parseInt(formData.BottlesPerCrate, 10),
        stock_crates: parseInt(formData.StockCrates, 10),
      },
    ]);

    if (stockError) {
      throw new Error(`Erreur lors de l'insertion dans 'stock_soft' : ${stockError.message}`);
    }

    return { success: true, message: 'Soft ajoutée avec succès !' };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
