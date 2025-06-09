// === File: /pages/submit.js ===
import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';

export default function SubmitRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [source, setSource] = useState('GPT');
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    const payload = {
      name,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      instructions: instructions.filter(i => i.trim() !== ''),
      source,
      notes,
      image_url: imageUrl
    };

    const res = await fetch('/api/submit-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (res.ok) {
      setSuccess(true);
    } else {
      setError(result.error || 'Failed to submit recipe.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Ingredients (one per line)"
          value={ingredients.join('\n')}
          onChange={(e) => setIngredients(e.target.value.split('\n'))}
          rows={5}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Instructions (one per line)"
          value={instructions.join('\n')}
          onChange={(e) => setInstructions(e.target.value.split('\n'))}
          rows={5}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Source (optional)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
        />

        <ImageUploader onUploaded={(url) => setImageUrl(url)} />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Recipe
        </button>

        {success && <p className="text-green-600">Recipe submitted successfully!</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
