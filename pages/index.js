import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImageUploaded = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/submit-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: recipeName,
        ingredients: ingredients.split('\n'),
        instructions: instructions.split('\n'),
        image_url: imageUrl,
        source: 'GPT',
        notes,
      }),
    });

    const data = await res.json();
    setSuccess(data.success);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Submit a Recipe</h1>

      <ImageUploader onUploaded={handleImageUploaded} />

      <input
        type="text"
        placeholder="Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        style={{ width: '100%', marginTop: '1rem' }}
      />

      <textarea
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', height: '100px' }}
      />

      <textarea
        placeholder="Instructions (one per line)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', height: '100px' }}
      />

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', height: '60px' }}
      />

      <button
        onClick={handleSubmit}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Submit Recipe
      </button>

      {success && <p style={{ color: 'green' }}>Recipe submitted successfully!</p>}
    </main>
  );
}
