'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  User,
} from 'firebase/auth';

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let auth: any = null;

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'hi' | 'en'>('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      
      // Set auth persistence to LOCAL
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Handle redirect result from Google Sign-in
          getRedirectResult(auth)
            .then((result) => {
              if (result?.user) {
                console.log('[v0] User signed in via redirect:', result.user.email);
                router.push('/dashboard');
              }
            })
            .catch((error) => {
              console.error('[v0] Error getting redirect result:', error);
            });

          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
          });
          return () => unsubscribe();
        })
        .catch((error) => {
          console.error('[v0] Error setting persistence:', error);
          setLoading(false);
        });

      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }

      const savedLang = localStorage.getItem('language') as 'hi' | 'en' | null;
      if (savedLang) {
        setLanguage(savedLang);
      }
    } catch (error) {
      console.error('[v0] Firebase initialization error:', error);
      setLoading(false);
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

  const handleGoogleLogin = async () => {
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      // Configure OAuth provider with Web Client ID
      provider.setCustomParameters({
        client_id: '222858597976-q080cqn43n3aftoor6rg5ie6ap0jqio5q.apps.googleusercontent.com',
      });
      provider.addScope('profile');
      provider.addScope('email');
      
      // Use signInWithRedirect for better mobile experience
      await signInWithRedirect(auth, provider);
      // After redirect back, getRedirectResult in useEffect will handle the redirect to dashboard
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'hi' ? 'en' : 'hi');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <p style={{ color: 'var(--text)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  const translations = {
    en: {
      appName: 'CHHAVI AI STUDIO',
      tagline: 'Transform the World with AI',
      loginBtn: 'Sign in with Google',
      googleLogin: 'Google से Login करो',
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
      loginBtn: 'गूगल से साइन इन करें',
      googleLogin: 'Google से Login करो',
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
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
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

      {/* Login Screen */}
      {!user ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
            gap: '20px',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>{t.appName}</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>{t.tagline}</p>
          <button
            onClick={handleGoogleLogin}
            style={{
              marginTop: '20px',
              padding: '15px 40px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '12px',
              background: 'var(--accent)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            {t.loginBtn}
          </button>
        </div>
      ) : (
        /* Main App */
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
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
              >
                {t.logout}
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
      )}
    </>
  );
}
