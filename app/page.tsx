'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'hi' | 'en'>('en');
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([]);

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

    // Generate particles for waterfall effect
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);
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

  const featureRoutes: { [key: string]: string } = {
    '💬 AI Chat': '/ai-chat',
    '🖼️ Text to Image': '/text-to-image',
    '🎨 Image to Image': '/image-to-image',
    '🎬 Image to Video': '/image-to-video',
    '🎥 Text to Video': '/text-to-video',
    '✨ AI Image Editor': '/image-editor',
    '📝 Prompt Templates': '/prompt-templates',
    '🖼️ Gallery': '/gallery',
    '📜 History': '/history',
    '⬇️ Downloads': '/downloads',
    '⚙️ Settings': '/settings',
    '👤 Profile': '/profile',
    '💎 PRO Membership': '/pro',
    '🎁 Daily Free Credits': '/credits',
  };

  return (
    <>
      {/* Animated Background with Waterfall Effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'var(--bg-gradient)',
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        {/* Animated Gradient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 20s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 25s ease-in-out infinite 2s',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'float 30s ease-in-out infinite 4s',
            pointerEvents: 'none',
          }}
        />

        {/* Waterfall Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.left}%`,
              top: '-50px',
              width: '3px',
              height: '3px',
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.8 - particle.id * 0.02}) 0%, transparent 70%)`,
              borderRadius: '50%',
              animation: `particleFloat ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 10px rgba(99, 102, 241, ${0.5 - particle.id * 0.01})`,
              pointerEvents: 'none',
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Splash Screen */}
      {splashVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f172a 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            animation: 'fadeOut 2s 2s forwards',
            color: 'white',
          }}
        >
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '10px',
              fontWeight: 'bold',
              animation: 'float 2s ease-in-out infinite',
            }}
          >
            🚀 CHHAVI AI
          </div>
          <p style={{ fontSize: '1.25rem' }}>{t.tagline}</p>
        </div>
      )}

      {/* Main App */}
      <div
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
          minHeight: '100vh',
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 30px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(10, 14, 39, 0.4)',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--accent)' }}>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                animation: 'titleGlow 3s ease-in-out infinite',
                letterSpacing: '1px',
              }}
            >
              ✨ {t.appName}
            </h1>
          </Link>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '8px 15px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '18px',
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                (e.target as HTMLButtonElement).style.borderColor = 'var(--accent)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.target as HTMLButtonElement).style.borderColor = 'var(--border-color)';
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
                backgroundColor: 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                (e.target as HTMLButtonElement).style.borderColor = 'var(--accent)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.target as HTMLButtonElement).style.borderColor = 'var(--border-color)';
              }}
            >
              {language === 'hi' ? 'EN' : 'हिं'}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div
          style={{
            padding: '80px 30px',
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 'bold',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'rotateGradient 8s ease infinite, float 4s ease-in-out infinite',
            } as React.CSSProperties}
          >
            {t.appName}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              opacity: 0.8,
              marginBottom: '40px',
              color: 'var(--text-secondary)',
            }}
          >
            {t.tagline}
          </p>
        </div>

        {/* Co-Founder Section */}
        <div
          style={{
            padding: '60px 30px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '40px',
              textAlign: 'center',
              color: 'var(--accent)',
            }}
          >
            🎭 Premium Co-Founder Team
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginBottom: '60px',
            }}
          >
            {[
              {
                name: t.coFounderName1,
                title: t.coFounderTitle,
                emoji: '👨‍💼',
              },
              {
                name: t.coFounderName2,
                title: t.coFounderRole2,
                emoji: '👨‍💼',
              },
            ].map((member, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--card-glass)',
                  backdropFilter: 'blur(20px)',
                  padding: '30px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  animation: 'floatSlow 4s ease-in-out infinite',
                  animationDelay: `${index * 0.5}s`,
                } as React.CSSProperties}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-15px)';
                  el.style.background = 'var(--card-glass)';
                  el.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.4), 0 0 100px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.1)';
                  el.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{member.emoji}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  {member.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features Section */}
        <div
          style={{
            padding: '60px 30px',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '50px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-purple) 50%, var(--accent-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } as React.CSSProperties}
          >
            🚀 {t.featuresTitle}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {t.features.map((feature, index) => {
              const route = featureRoutes[feature] || '/';
              return (
                <Link key={index} href={route} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      backgroundColor: 'var(--card-glass)',
                      backdropFilter: 'blur(20px)',
                      padding: '25px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)',
                      transition: 'all 0.3s ease',
                      textAlign: 'center',
                      fontWeight: '500',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseOver={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translateY(-10px) scale(1.05)';
                      el.style.background = 'rgba(15, 23, 42, 0.8)';
                      el.style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.15)';
                      el.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                      el.style.color = 'var(--accent-cyan)';
                    }}
                    onMouseOut={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translateY(0) scale(1)';
                      el.style.background = 'var(--card-glass)';
                      el.style.boxShadow = 'none';
                      el.style.borderColor = 'var(--border-color)';
                      el.style.color = 'var(--text)';
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{feature}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '40px 30px',
            textAlign: 'center',
            borderTop: '1px solid var(--border-color)',
            marginTop: '60px',
            color: 'var(--text-secondary)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p>
            © 2026 {t.appName} | Powered by AI ✨
          </p>
        </div>
      </div>
    </>
  );
}
