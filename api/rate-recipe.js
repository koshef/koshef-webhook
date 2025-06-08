import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipe_id, rating, user_id = null } = req.body;

  if (!recipe_id || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Insert the rating
  const { error: insertError } = await supabase
    .from('recipe_ratings')
    .insert({ recipe_id, rating, user_id });

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }

  // Recalculate average
  const { data: ratings, error: fetchError } = await supabase
    .from('recipe_ratings')
    .select('rating')
    .eq('recipe_id', recipe_id);

  if (fetchError) {
    return res.status(500).json({ error: fetchError.message });
  }

  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  const average = parseFloat((total / ratings.length).toFixed(2));

  // Update recipe with new average
  const { error: updateError } = await supabase
    .from('recipes')
    .update({ average_rating: average })
    .eq('id', recipe_id);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  return res.status(200).json({ success: true, average_rating: average });
}
