'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'hi' | 'en'>('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    const timer = setTimeout(() => setSplashVisible(false), 2000);
    return () => clearTimeout(timer);
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

  const translations = {
    en: {
      appName: 'CHHAVI AI STUDIO',
      tagline: 'Transform the World with AI',
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
      coFounderTitle: 'सीईओ और संस्थापक',
      coFounderName1: 'Chhavi Nath Nagesh',
      coFounderName2: 'Parmeshwar Nagesh',
      coFounderRole2: 'सह-संस्थापक',
      featuresTitle: 'AI फीचर्स',
      features: ['💬 AI Chat', '🖼️ Text to Image', '🎨 Image to Image', '🎬 Image to Video', '🎥 Text to Video', '✨ AI Image Editor', '📝 Prompt Templates', '🖼️ Gallery', '📜 History', '⬇️ Downloads', '⚙️ Settings', '👤 Profile', '💎 PRO Membership', '🎁 Daily Free Credits'],
    },
  };

  const t = translations[language];

  // Feature to route mapping with gradient colors
  const featureRoutes: { [key: string]: { route: string; gradient: string } } = {
    '💬 AI Chat': { route: '/ai-chat', gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' },
    '🖼️ Text to Image': { route: '/text-to-image', gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' },
    '🎨 Image to Image': { route: '/image-to-image', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' },
    '🎬 Image to Video': { route: '/image-to-video', gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' },
    '🎥 Text to Video': { route: '/text-to-video', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' },
    '✨ AI Image Editor': { route: '/image-editor', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' },
    '📝 Prompt Templates': { route: '/prompt-templates', gradient: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)' },
    '🖼️ Gallery': { route: '/gallery', gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)' },
    '📜 History': { route: '/history', gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
    '⬇️ Downloads': { route: '/downloads', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' },
    '⚙️ Settings': { route: '/settings', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' },
    '👤 Profile': { route: '/profile', gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)' },
    '💎 PRO Membership': { route: '/pro', gradient: 'linear-gradient(135deg, #fbbf24 0%, #fcd34d 100%)' },
    '🎁 Daily Free Credits': { route: '/credits', gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)' },
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  return (
    <>
      {/* Splash Screen */}
      {splashVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            animation: 'fadeOut 2s 2s forwards',
            color: 'white',
          }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', fontWeight: 'bold' }}>🚀 CHHAVI AI</h1>
          <p style={{ fontSize: '1.25rem' }}>{t.tagline}</p>
        </div>
      )}

      {/* Main App */}
      <div className="premium-gradient-bg" style={{ minHeight: '100vh', color: 'var(--text)', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Floating Orbs Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
          <div className="floating-orb orb-cyan" style={{ top: '10%', left: '10%' }}></div>
          <div className="floating-orb orb-purple" style={{ top: '60%', right: '15%' }}></div>
          <div className="floating-orb orb-gold" style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}></div>
        </div>

        {/* Content Container */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Navigation Bar */}
          <nav
            style={{
              background: 'rgba(10, 14, 39, 0.6)',
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 50,
            }}
          >
            <h2 className="gradient-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              {t.appName}
            </h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99, 102, 241, 0.6)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99, 102, 241, 0.3)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button
                onClick={toggleLanguage}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99, 102, 241, 0.6)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99, 102, 241, 0.3)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                }}
              >
                {language === 'hi' ? 'EN' : 'हिं'}
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '4rem 2rem',
              minHeight: '60vh',
            }}
          >
            <h1 className="gradient-title fade-in-up" style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
              {t.appName}
            </h1>
            <p className="fade-in-up" style={{ fontSize: '1.5rem', color: '#06b6d4', marginBottom: '2rem', animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
              {t.tagline}
            </p>
          </div>

          {/* Premium Co-Founder Team Section */}
          <div style={{ padding: '3rem 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: 'var(--text)' }}>
              {t.coFounderTitle}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              {[
                { name: t.coFounderName1, role: t.coFounderTitle, emoji: '👨‍💼' },
                { name: t.coFounderName2, role: t.coFounderRole2, emoji: '👨‍💼' },
              ].map((founder, index) => (
                <div
                  key={index}
                  className="glassmorphic-card"
                  style={{
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    textAlign: 'center',
                    transform: 'translateZ(0)',
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px) scale(1.02)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{founder.emoji}</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{founder.name}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '1rem' }}>{founder.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Features Section */}
          <div style={{ padding: '3rem 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: 'var(--text)' }}>
              {t.featuresTitle}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem',
              }}
            >
              {t.features.map((feature, index) => {
                const featureData = featureRoutes[feature] || { route: '/', gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' };
                return (
                  <Link
                    key={index}
                    href={featureData.route}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="feature-btn-gradient"
                      style={{
                        background: featureData.gradient,
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        cursor: 'pointer',
                        border: 'none',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                      }}
                      onMouseOver={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'translateY(-8px) scale(1.05)';
                        el.style.boxShadow = '0 0 30px currentColor, 0 8px 20px rgba(0, 0, 0, 0.5)';
                      }}
                      onMouseOut={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'translateY(0) scale(1)';
                        el.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      {feature}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer Spacing */}
          <div style={{ height: '4rem' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </>
  );
}
