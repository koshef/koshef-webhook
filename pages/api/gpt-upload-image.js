import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'Form parse error' });

    const file = files.image;
    if (!file) {
      return res.status(200).json({ publicUrl: null }); // image optional
    }

    const ext = file.originalFilename.split('.').pop();
    const newFilename = `${Date.now()}.${ext}`;
    const path = `recipe-images/${newFilename}`;
    const fileBuffer = await fs.promises.readFile(file.filepath);

    const { error } = await supabase.storage
      .from('recipe-images')
      .upload(path, fileBuffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) return res.status(500).json({ error: error.message });

    const { data } = supabase.storage.from('recipe-images').getPublicUrl(path);
    return res.status(200).json({ publicUrl: data.publicUrl });
  });
}
