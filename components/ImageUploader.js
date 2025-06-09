// === File: /components/ImageUploader.js ===
import { useState } from 'react';

export default function ImageUploader({ onUploaded }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    // Get signed URL
    const res = await fetch('/api/get-upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileType: file.type }),
    });

    const { uploadUrl, publicUrl } = await res.json();

    // Upload the image
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    setUploading(false);
    onUploaded(publicUrl); // Send public URL to parent component
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
