import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Required for ESM support of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Disable the default body parser for file uploads
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

  const form = formidable({
    multiples: false,
    uploadDir: __dirname,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Form parsing failed' });
    }

    const { name, ingredients, instructions, source = 'GPT' } = fields;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let image_url = null;

    if (files.image) {
      const file = files.image[0];
      const fileExt = file.originalFilename.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `recipe-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(filePath, fs.createReadStream(file.filepath), {
          contentType: file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({ error: 'Image upload failed' });
      }

      const { data: publicUrl } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(filePath);

      image_url = publicUrl.publicUrl;
    }

    const { data, error: insertError } = await supabase
      .from('recipes')
      .insert([{ name, ingredients, instructions, image_url, source }])
      .select();

    if (insertError) {
      return res.status(500).json({ error: 'Recipe insert failed' });
    }

    res.status(200).json({ success: true, data });
  });
}

    res.status(200).json({ success: true, data: insertData });
  });
}
