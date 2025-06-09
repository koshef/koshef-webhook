import ImageUploader from '../components/ImageUploader';

export default function Home() {
  const handleImageUploaded = (url) => {
    console.log('Image uploaded to:', url);
    // You can later pass this to a recipe form
  };

  return (
    <main>
      <h1>Upload a Recipe Image</h1>
      <ImageUploader onUploaded={handleImageUploaded} />
    </main>
  );
}
