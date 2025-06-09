import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileType } = req.body;

  if (!fileType || !fileType.startsWith('image/')) {
    return res.status(400).json({ error: 'Invalid or missing file type' });
  }

  const extension = fileType.split('/')[1];
  const fileName = `${uuidv4()}.${extension}`;
  const filePath = `recipe-images/${fileName}`;

  const { data, error } = await supabase
    .storage
    .from('recipe-images')
    .createSignedUploadUrl(filePath, 60); // valid for 60 seconds

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const publicUrl = supabase
    .storage
    .from('recipe-images')
    .getPublicUrl(filePath).data.publicUrl;

  return res.status(200).json({
    uploadUrl: data.signedUrl,
    publicUrl
  });
}
🔐 This endpoint is protected and server-side only — it requires your Supabase service key.

🔵 STEP 3: Frontend Upload Code (React or HTML)
A. If you're using React (preferred):
Create a component like this:

jsx
Edit
import { useState } from 'react';

export default function ImageUploader({ onUploaded }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const res = await fetch('/api/get-upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileType: file.type }),
    });

    const { uploadUrl, publicUrl } = await res.json();

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    setUploading(false);
    onUploaded(publicUrl); // Send public URL to parent component or recipe form
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
