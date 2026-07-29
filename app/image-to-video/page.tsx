'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImageToVideoPage() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleGenerate = async () => {
    if (imageUploaded && prompt.trim()) {
      setLoading(true);
      // Simulate video generation
      setTimeout(() => {
        setLoading(false);
      }, 3000);
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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>🎬 Image to Video</h1>
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
          maxWidth: '800px',
          margin: '30px auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        {/* Image Upload Section */}
        <div>
          <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}>
            1. Upload Your Image
          </label>
          <div
            onClick={() => document.getElementById('imageInput')?.click()}
            style={{
              padding: '40px',
              border: '2px dashed var(--border-color)',
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: 'var(--card)',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--card)';
            }}
          >
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={() => setImageUploaded(true)}
              style={{ display: 'none' }}
            />
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📷</div>
            <p style={{ marginBottom: '5px', fontWeight: '500' }}>
              {imageUploaded ? '✓ Image uploaded' : 'Click to upload or drag and drop'}
            </p>
            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        {/* Motion Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}>
            2. Describe the Motion
          </label>
          <textarea
            placeholder="E.g., Pan camera from left to right, zoom in on the subject, add flying particles..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={!imageUploaded}
            style={{
              width: '100%',
              height: '120px',
              padding: '15px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--card)',
              color: 'var(--text)',
              fontSize: '16px',
              fontFamily: 'inherit',
              opacity: imageUploaded ? 1 : 0.5,
              cursor: imageUploaded ? 'text' : 'not-allowed',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!imageUploaded || !prompt.trim() || loading}
          style={{
            padding: '15px 30px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor:
              imageUploaded && prompt.trim() && !loading
                ? 'var(--accent)'
                : 'rgba(99, 102, 241, 0.5)',
            color: 'white',
            cursor:
              imageUploaded && prompt.trim() && !loading ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          {loading ? '🎥 Generating Video...' : '🎥 Generate Video'}
        </button>

        {/* Video Preview Section */}
        {loading && (
          <div
            style={{
              backgroundColor: 'var(--card)',
              borderRadius: '15px',
              padding: '60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              border: '2px dashed var(--border-color)',
            }}
          >
            <div style={{ fontSize: '3rem', animation: 'spin 2s linear infinite' }}>🎬</div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Creating your video...</p>
            <p style={{ opacity: 0.6 }}>This may take a few moments</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
