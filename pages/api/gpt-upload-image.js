import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import { Readable } from 'stream';

// Disable Next.js built-in body parser
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

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(400).json({ error: 'Error parsing form data' });
    }

    const file = files.image;
    if (!file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const fileData = fs.readFileSync(file[0].filepath);
    const fileExt = file[0].originalFilename.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `recipe-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(filePath, fileData, {
        contentType: file[0].mimetype,
        upsert: true,
      });

    if (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }

    const { data: publicData } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filePath);

    return res.status(200).json({ publicUrl: publicData.publicUrl });
  });
}
