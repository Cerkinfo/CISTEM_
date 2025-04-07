import { supabase } from "../../utils/supabase";

export const insert_query = async (formData) => {
  try {
    const { data: publicUrlData } = supabase.storage.from('material-images').getPublicUrl('/'+formData.Image);
    let imageUrl = publicUrlData.publicUrl;

    const { data: materialData, error: materialError } = await supabase
      .from('materials')
      .insert([
        {
          name: formData.Name,
          description: formData.Description,
          image: imageUrl,
          price: parseFloat(formData.Price),
        },
      ])
      .select()
      .single();

    if (materialError) {
      throw new Error(`Erreur lors de l'insertion dans 'materials' : ${materialError.message}`);
    }

    const materialId = materialData.id;

    const { error: stockError } = await supabase.from('stock_materials').insert([
      {
        id: materialId,
        entity_per_box: parseInt(formData.EntityPerBox, 10),
        stock_box: parseInt(formData.StockBox, 10),
      },
    ]);

    if (stockError) {
      throw new Error(`Erreur lors de l'insertion dans 'stock_materials' : ${stockError.message}`);
    }

    return { success: true, message: 'Nourriture ajoutée avec succès !' };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
