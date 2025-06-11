// pages/api/gpt-upload-image.js
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

// Prevent Next.js from parsing the body
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

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Error parsing form' });
    }

    const imageFile = files.image;

    if (!imageFile) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
    const fileExt = file.originalFilename.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `recipe-images/${fileName}`;
    const buffer = await fs.promises.readFile(file.filepath);

    const { error } = await supabase.storage
      .from('recipe-images')
      .upload(filePath, buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const { data } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filePath);

    return res.status(200).json({ publicUrl: data.publicUrl });
  });
}
