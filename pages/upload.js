// pages/upload.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UploadPage() {
  const router = useRouter();
  const { recipe_id } = router.query;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (!recipe_id) {
      setStatus({ type: 'error', message: 'No recipe ID provided. Please access this page with a valid recipe_id parameter.' });
    }
  }, [recipe_id]);

  const handleFileSelect = (file) => {
    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', message: 'Please select a valid image file.' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'File size must be less than 10MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    setImage(file);
    setStatus({ type: '', message: '' });
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!image || !recipe_id) return;

    const formData = new FormData();
    formData.append('recipe_id', recipe_id);
    formData.append('image', image);

    setStatus({ type: 'loading', message: 'Uploading your image...' });

    try {
      const res = await fetch('/api/submit-recipe', { method: 'POST', body: formData });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Image uploaded successfully!' });
        setTimeout(() => router.push('/'), 3000);
      } else {
        const data = await res.json();
        setStatus({ type: 'error', message: data.message || 'Upload failed. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #F6F0E5, #FFFBEF)', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ position: 'fixed', top: 0, width: '100%', background: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '1rem 0', zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
          <a href="/" style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#7A9E7E', textDecoration: 'none' }}>Koshef</a>
          <nav>
            <a href="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#3C3C3C' }}>Home</a>
            <a href="/upload" style={{ color: '#C1694F', textDecoration: 'none' }}>Upload</a>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: '120px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '2rem', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
          <h1 style={{ textAlign: 'center', color: '#7A9E7E', marginBottom: '1rem' }}>Upload Recipe Image</h1>

          {status.message && (
            <div style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '12px', backgroundColor: status.type === 'error' ? '#f8d7da' : status.type === 'success' ? '#d4edda' : '#fff3cd', color: status.type === 'error' ? '#721c24' : status.type === 'success' ? '#155724' : '#856404' }}>
              {status.message}
            </div>
          )}

          {recipe_id && (
            <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#666' }}>Recipe ID: {recipe_id}</div>
          )}

          <form onSubmit={uploadImage}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Recipe Image</label>
              <input type="file" accept="image/*" required style={{ width: '100%' }} onChange={(e) => handleFileSelect(e.target.files[0])} />
              {preview && <img src={preview} alt="Preview" style={{ marginTop: '1rem', maxWidth: '100%', borderRadius: '8px' }} />}
            </div>

            <button type="submit" disabled={!recipe_id} style={{ width: '100%', padding: '1rem', borderRadius: '12px', backgroundColor: '#C1694F', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
              {status.type === 'loading' ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </div>
      </main>

      <footer style={{ marginTop: '2rem', textAlign: 'center', padding: '1rem', backgroundColor: '#3C3C3C', color: '#fff' }}>
        © 2025 Koshef.ai. All rights reserved.
      </footer>
    </div>
  );
}
