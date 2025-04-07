import { supabase } from "../../utils/supabase";

export const insert_query = async (formData) => {
  try {
    const { data: publicUrlData } = supabase.storage.from('food-images').getPublicUrl('/'+formData.Image);
    let imageUrl = publicUrlData.publicUrl;

    const { data: foodData, error: foodError } = await supabase
      .from('foods')
      .insert([
        {
          name: formData.Name,
          ingredients: formData.Ingredients,
          image: imageUrl,
          price: parseFloat(formData.Price),
        },
      ])
      .select()
      .single();

    if (foodError) {
      throw new Error(`Erreur lors de l'insertion dans 'foods' : ${foodError.message}`);
    }

    const foodId = foodData.id;

    const { error: stockError } = await supabase.from('stock_foods').insert([
      {
        id: foodId,
        entity_per_box: parseInt(formData.EntityPerBox, 10),
        stock_box: parseInt(formData.StockBox, 10),
      },
    ]);

    if (stockError) {
      throw new Error(`Erreur lors de l'insertion dans 'stock_foods' : ${stockError.message}`);
    }

    return { success: true, message: 'Nourriture ajoutée avec succès !' };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
