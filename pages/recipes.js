import { useEffect, useState } from 'react';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/get-recipes')
      .then(res => res.json())
      .then(data => setRecipes(data.recipes || []));
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ color: '#7A9E7E' }}>All Recipes</h1>
      <ul>
        {recipes.map(r => (
          <li key={r.id} style={{ marginBottom: '1rem' }}>
            <strong>{r.name}</strong><br />
            {r.notes || ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
