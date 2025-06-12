import { useState } from 'react';

export default function SubmitRecipe() {
  const [form, setForm] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    notes: '',
  });
  const [message, setMessage] = useState('');

  const submit = async () => {
    const res = await fetch('/api/submit-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        ingredients: form.ingredients.split('\n'),
        instructions: form.instructions.split('\n'),
        source: 'Frontend',
      }),
    });
    const data = await res.json();
    setMessage(data.success ? 'Recipe submitted!' : 'Error submitting recipe');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ color: '#C1694F' }}>Submit Your Recipe</h1>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br />
      <textarea placeholder="Ingredients" value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} /><br />
      <textarea placeholder="Instructions" value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} /><br />
      <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /><br />
      <button onClick={submit}>Submit</button>
      <p>{message}</p>
    </main>
  );
}
