import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import { Readable } from 'stream';

// Disable body parsing so we can use formidable
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

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(400).json({ error: 'Error parsing form data' });
    }

    const { name, ingredients, instructions, source = 'GPT' } = fields;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let image_url = null;

    if (files.image) {
      const file = files.image;
      const filepath = Array.isArray(file) ? file[0].filepath : file.filepath;

      if (!filepath) {
        return res.status(400).json({ error: 'File path missing' });
      }

      const originalName = file.originalFilename || 'image.jpg';
      const fileExt = originalName.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const storagePath = `recipe-images/${fileName}`;

      const fileStream = fs.createReadStream(filepath);

      const { error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(storagePath, fileStream, {
          contentType: file.mimetype,
        });

      if (uploadError) {
        console.error('Image upload failed:', uploadError);
        return res.status(500).json({ error: 'Image upload failed' });
      }

      const { data: publicUrlData } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(storagePath);

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

    return res.status(200).json({ success: true, data });
  });
}
