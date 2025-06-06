import { createClient } from '@supabase/supabase-js';
import { IncomingForm } from 'formidable'; // ✅ FIXED
import fs from 'fs';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({ multiples: false }); // ✅ FIXED

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Error parsing form data' });
    }

    const { name, ingredients, instructions, source = 'GPT' } = fields;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let image_url = null;

    if (files.image) {
      const file = files.image;
      const fileExt = file.originalFilename.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `recipe-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(filePath, fs.createReadStream(file.filepath), {
          contentType: file.mimetype,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return res.status(500).json({ error: 'Image upload failed' });
      }

      const { data: publicUrlData } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(filePath);

      image_url = publicUrlData.publicUrl;
    }

    const { data, error: insertError } = await supabase
      .from('recipes')
      .insert([{ name, ingredients, instructions, image_url, source }])
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(500).json({ error: 'Failed to save recipe' });
    }

    res.status(200).json({ success: true, data });
  });
}
