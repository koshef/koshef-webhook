import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [dietType, setDietType] = useState('');
  const [difficulty, setDifficulty] = useState('');
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
        tags: tags.split(',').map(tag => tag.trim()),
        category,
        diet_type: dietType,
        difficulty,
      }),
    });

    const data = await res.json();
    setSuccess(data.success);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '700px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#7A9E7E' }}>Submit a Kosher Recipe</h1>

      <ImageUploader onUploaded={handleImageUploaded} />

      <input
        type="text"
        placeholder="Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}
      />

      <textarea
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', height: '100px' }}
      />

      <textarea
        placeholder="Instructions (one per line)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', height: '100px' }}
      />

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', height: '60px' }}
      />

      <input
        type="text"
        placeholder="Tags (comma separated, e.g. Shabbos, Gluten-Free)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}
      />

      <input
        type="text"
        placeholder="Category (e.g. Dinner, Dessert)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}
      />

      <input
        type="text"
        placeholder="Diet Type (Meat, Dairy, Parve)"
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}
      >
        <option value="">Select Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#C1694F',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Submit Recipe
      </button>

      {success && <p style={{ color: '#7A9E7E', marginTop: '1rem' }}>✅ Recipe submitted successfully!</p>}
    </main>
  );
}
