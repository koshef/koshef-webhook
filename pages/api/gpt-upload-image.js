import { IncomingForm } from 'formidable';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Disables Next.js body parsing so we can handle the stream ourselves
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

  const form = new IncomingForm({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(400).json({ error: 'Form parsing failed' });
    }

    if (!files.image) {
      return res.status(200).json({
        publicUrl: null,
      });
    }

    const file = files.image[0];
    const buffer = await fs.promises.readFile(file.filepath);
    const fileName = `recipe-images/${Date.now()}-${file.originalFilename}`;

    const { error } = await supabase.storage
      .from('recipe-images')
      .upload(fileName, buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const { data } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(fileName);

    return res.status(200).json({ publicUrl: data.publicUrl });
  });
}
