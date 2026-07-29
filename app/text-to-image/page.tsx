'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleGenerate = async () => {
    if (prompt.trim()) {
      setLoading(true);
      // Simulate image generation
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 20px',
          backgroundColor: 'var(--card)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'var(--text)' }}>
            ← Back to Home
          </h2>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>🖼️ Text to Image</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            padding: '8px 15px',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '900px',
          margin: '30px auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
        }}
      >
        {/* Input Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Describe the image you want to generate:
            </label>
            <textarea
              placeholder="E.g., A futuristic city with flying cars and neon lights..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                width: '100%',
                height: '200px',
                padding: '15px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: 'var(--card)',
                color: 'var(--text)',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            style={{
              padding: '15px 30px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: prompt.trim() && !loading ? 'var(--accent)' : 'rgba(99, 102, 241, 0.5)',
              color: 'white',
              cursor: prompt.trim() && !loading ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {/* Image Preview Section */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            borderRadius: '15px',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            border: '2px dashed var(--border-color)',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Generating...</p>
              <div style={{ fontSize: '2rem' }}>🎨</div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', opacity: 0.6 }}>
              <p style={{ fontSize: '1.2rem' }}>Generated image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
