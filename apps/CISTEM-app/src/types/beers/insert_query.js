import { supabase } from "../../utils/supabase";

export const insert_query = async (formData) => {
  try {
    const { data: publicUrlData } = supabase.storage.from('beer-images').getPublicUrl('/'+formData.Image);
    let imageUrl = publicUrlData.publicUrl;

    const { data: beerData, error: beerError } = await supabase
      .from('beers')
      .insert([
        {
          name: formData.Name,
          type: formData.Type,
          volume: parseFloat(formData.Volume),
          alcohol: parseFloat(formData.Alcohol),
          description: formData.Description,
          image: imageUrl,
          price: parseFloat(formData.Price),
        },
      ])
      .select()
      .single();

    if (beerError) {
      throw new Error(`Erreur lors de l'insertion dans 'beers' : ${beerError.message}`);
    }

    const beerId = beerData.id;

    const { error: tasteError } = await supabase.from('beers_taste').insert([
      {
        id: beerId,
        bitterness: parseFloat(formData.Bitterness),
        power: parseFloat(formData.Power),
        roundness: parseFloat(formData.Roundness),
        fruity: parseFloat(formData.Fruity),
        liveliness: parseFloat(formData.Liveliness),
        acidity: parseFloat(formData.Acidity),
      },
    ]);

    if (tasteError) {
      throw new Error(`Erreur lors de l'insertion dans 'beers_taste' : ${tasteError.message}`);
    }

    const { error: flavorError } = await supabase.from('beers_flavors').insert([
      {
        id: beerId,
        visual: formData.Visual,
        smell: formData.Smell,
        taste: formData.Taste,
      },
    ]);

    if (flavorError) {
      throw new Error(`Erreur lors de l'insertion dans 'beers_flavors' : ${flavorError.message}`);
    }

    const { error: stockError } = await supabase.from('stock_beers').insert([
      {
        id: beerId,
        bottles_per_crate: parseInt(formData.BottlesPerCrate, 10),
        stock_crates: parseInt(formData.StockCrates, 10),
      },
    ]);

    if (stockError) {
      throw new Error(`Erreur lors de l'insertion dans 'beers_stock' : ${stockError.message}`);
    }

    return { success: true, message: 'Bière ajoutée avec succès !' };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
