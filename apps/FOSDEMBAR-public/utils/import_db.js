import { createClient } from "@supabase/supabase-js";
import fs from 'fs';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "https://kagvlnuflsooisreyboz.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZ3ZsbnVmbHNvb2lzcmV5Ym96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMTIxNDcsImV4cCI6MjA1MTc4ODE0N30.kyjS2flOmWSNCoN4B_hAmnyq_UjftxboVDTomIp5noI";

console.log("🚀 ~ supabaseUrl:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const exportBeersToJson = async () => {
  try {
    const { data, error } = await supabase
      .from('beers')
      .select(`
        id, name, type, volume, alcohol, description, image, price,
        beers_taste (bitterness, power, roundness, fruity, liveliness, acidity),
        beers_flavors (visual, smell, taste)
      `);

    if (error) throw new Error(`Erreur lors de la récupération des bières : ${error.message}`);

    fs.writeFileSync('src/assets/data/beers.json', JSON.stringify(data, null, 2), 'utf-8');

    console.log('✅ Exportation réussie ! Données enregistrées dans beers.json');
  } catch (error) {
    console.error('❌ Erreur lors de l’exportation :', error.message);
  }
};

const exportSoftsToJson = async () => {
    try {
      const { data, error } = await supabase
        .from('softs')
        .select(`
          id, name, volume, image, price
        `);
  
      if (error) throw new Error(`Erreur lors de la récupération des bières : ${error.message}`);
  
      fs.writeFileSync('src/assets/data/softs.json', JSON.stringify(data, null, 2), 'utf-8');
  
      console.log('✅ Exportation réussie ! Données enregistrées dans softs.json');
    } catch (error) {
      console.error('❌ Erreur lors de l’exportation :', error.message);
    }
};

const exportFoodsToJson = async () => {
    try {
      const { data, error } = await supabase
        .from('foods')
        .select(`
          id, name, ingredients, image, price
        `);
  
      if (error) throw new Error(`Erreur lors de la récupération des bières : ${error.message}`);
  
      fs.writeFileSync('src/assets/data/foods.json', JSON.stringify(data, null, 2), 'utf-8');
  
      console.log('✅ Exportation réussie ! Données enregistrées dans foods.json');
    } catch (error) {
      console.error('❌ Erreur lors de l’exportation :', error.message);
    }
};

exportBeersToJson();
exportSoftsToJson();
exportFoodsToJson();