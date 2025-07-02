// pages/index.js

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: 'linear-gradient(135deg, #F6F0E5, #FFFBEF)', color: '#3C3C3C' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'linear-gradient(135deg, #7A9E7E, #638a68)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>K</div>
            <a href="#" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#7A9E7E', textDecoration: 'none' }}>Koshef</a>
          </div>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            {['Home', 'About', 'Recipes', 'Submit', 'Rate', 'Upload', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: '#3C3C3C', padding: '0.5rem 1rem' }}>{item}</a>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <section style={{ padding: '6rem 0', textAlign: 'center', borderRadius: '30px', margin: '2rem 0', background: 'linear-gradient(135deg, rgba(122,158,126,0.1), rgba(193,105,79,0.1))' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(135deg, #7A9E7E, #C1694F)', WebkitBackgroundClip: 'text', color: 'transparent', marginBottom: '1rem' }}>Welcome to Koshef</h1>
          <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem' }}>A vibrant community-driven platform where kosher cooking comes alive.</p>
          <a href="#recipes" style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'linear-gradient(135deg, #7A9E7E, #638a68)', color: 'white', textDecoration: 'none', fontWeight: 600 }}>Explore Recipes</a>
        </section>

        <section id="about" style={{ padding: '4rem 0' }}>
          <div style={{ padding: '3rem', borderRadius: '20px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #7A9E7E, #C1694F)', WebkitBackgroundClip: 'text', color: 'transparent', marginBottom: '1.5rem' }}>About Koshef</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>Koshef is a thriving community where culinary traditions meet modern innovation.</p>
          </div>
        </section>

        <footer style={{ textAlign: 'center', padding: '2rem 0', background: 'rgba(60,60,60,0.9)', color: 'white', borderRadius: '20px 20px 0 0', marginTop: '4rem' }}>
          © 2025 Koshef.ai. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
