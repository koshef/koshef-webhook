import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import { Readable } from 'stream';

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

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.image) {
      return res.status(400).json({ error: 'Image upload failed' });
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

    const publicUrl = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filePath).data.publicUrl;

    return res.status(200).json({ publicUrl });
  });
}
