'use client';

import { useEffect, useState } from 'react';

export default function DemoPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'hi' | 'en'>('en');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedLang = localStorage.getItem('language') as 'hi' | 'en' | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  const translations = {
    en: {
      appName: 'CHHAVI AI STUDIO',
      tagline: 'Transform the World with AI',
      logout: 'Logout',
      coFounderTitle: 'CEO & Founder',
      coFounderName1: 'Chhavi Nath Nagesh',
      coFounderName2: 'Parmeshwar Nagesh',
      coFounderRole2: 'Co-Founder',
      featuresTitle: 'AI Features',
      features: ['💬 AI Chat', '🖼️ Text to Image', '🎨 Image to Image', '🎬 Image to Video', '🎥 Text to Video', '✨ AI Image Editor', '📝 Prompt Templates', '🖼️ Gallery', '📜 History', '⬇️ Downloads', '⚙️ Settings', '👤 Profile', '💎 PRO Membership', '🎁 Daily Free Credits'],
    },
    hi: {
      appName: 'CHHAVI AI स्टूडियो',
      tagline: 'AI से दुनिया बदलो',
      logout: 'लॉगआउट',
      coFounderTitle: 'सीईओ और संस्थापक',
      coFounderName1: 'Chhavi Nath Nagesh',
      coFounderName2: 'Parmeshwar Nagesh',
      coFounderRole2: 'सह-संस्थापक',
      featuresTitle: 'AI फीचर्स',
      features: ['💬 AI Chat', '🖼️ Text to Image', '🎨 Image to Image', '🎬 Image to Video', '🎥 Text to Video', '✨ AI Image Editor', '📝 Prompt Templates', '🖼️ Gallery', '📜 History', '⬇️ Downloads', '⚙️ Settings', '👤 Profile', '💎 PRO Membership', '🎁 Daily Free Credits'],
    },
  };

  const t = translations[language];

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
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CHHAVI AI</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: '8px 15px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleLanguage}
            style={{
              padding: '8px 15px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {language === 'hi' ? 'EN' : 'हिं'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Premium Team Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
            borderRadius: '20px',
            padding: '40px 20px',
            marginBottom: '40px',
            border: '2px solid var(--accent)',
            animation: 'glow 3s ease-in-out infinite',
          }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '1.75rem', marginBottom: '30px', fontWeight: 'bold' }}>
            🤝 Premium Co-Founder Team
          </h2>

          {/* Team Members Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Member 1 */}
            <div
              style={{
                backgroundColor: 'var(--card)',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center',
                border: '1px solid var(--accent-light)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  margin: '0 auto 15px',
                  border: '3px solid var(--accent)',
                }}
              >
                👩‍💼
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '5px' }}>
                {t.coFounderName1}
              </h3>
              <p style={{ color: 'var(--accent-light)', fontSize: '0.95rem', marginBottom: '10px' }}>
                {t.coFounderTitle}
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Leading innovation in AI</p>
            </div>

            {/* Member 2 */}
            <div
              style={{
                backgroundColor: 'var(--card)',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center',
                border: '1px solid var(--accent-light)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  margin: '0 auto 15px',
                  border: '3px solid var(--accent)',
                }}
              >
                👨‍💼
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '5px' }}>
                {t.coFounderName2}
              </h3>
              <p style={{ color: 'var(--accent-light)', fontSize: '0.95rem', marginBottom: '10px' }}>
                {t.coFounderRole2}
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Driving business growth</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '20px', fontWeight: 'bold' }}>{t.featuresTitle}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '15px',
            }}
          >
            {t.features.map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--card)',
                  padding: '20px',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontWeight: '500',
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-5px)';
                  el.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.2)';
                  el.style.borderColor = 'var(--accent)';
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'var(--border-color)';
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
