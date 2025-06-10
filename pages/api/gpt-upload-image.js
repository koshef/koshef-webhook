import { createClient } from '@supabase/supabase-js';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Needed for formidable to work
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

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Form parsing error' });
    }

    // GPT fallback for test calls without files
    if (!files.image) {
      return res.status(200).json({
        publicUrl: 'https://koshef.ai/storage/v1/object/public/recipe-images/placeholder.jpg',
      });
    }

    const file = files.image[0];
    const fileExt = file.originalFilename.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `recipe-images/${fileName}`;

    const fileBuffer = await fs.promises.readFile(file.filepath);

    const { error } = await supabase.storage
      .from('recipe-images')
      .upload(filePath, fileBuffer, {
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
