import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUploaded = (url) => {
    setImageUrl(url);
    console.log('Image uploaded to:', url);
  };

  return (
    <main>
      <h1>Upload a Recipe Image</h1>
      <ImageUploader onUploaded={handleImageUploaded} />
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded Recipe" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </main>
  );
}
