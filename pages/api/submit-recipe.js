import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: true // Accept JSON directly
  }
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      ingredients,
      instructions,
      source = 'GPT',
      image_url = null,
      notes = null,
      tags = null,
      category = null,
      diet_type = null,
      difficulty = null
    } = req.body;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const formattedIngredients = Array.isArray(ingredients)
      ? ingredients.join('\n')
      : ingredients;

    const formattedInstructions = Array.isArray(instructions)
      ? instructions.join('\n')
      : instructions;

    const { data, error } = await supabase
      .from('recipes')
      .insert([
        {
          id: `gpt_${Date.now()}`,
          name,
          ingredients: formattedIngredients,
          instructions: formattedInstructions,
          source,
          image_url,
          notes,
          tags,
          category,
          diet_type,
          difficulty
        }
      ])
      .select();

    if (error) {
      console.error('Insert error:', error);
      return res.status(500).json({ error: 'Failed to save recipe' });
    }

    res.status(200).json({ success: true, recipe: data[0] });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
}
