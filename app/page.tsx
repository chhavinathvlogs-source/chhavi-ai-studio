'use client';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential,
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
  
  // Phone OTP states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      
      // Set auth persistence to LOCAL
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
              router.push('/dashboard');
            }
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

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: () => {},
        });
      } catch (error) {
        console.log('[v0] reCAPTCHA already initialized');
      }
    }
    return window.recaptchaVerifier;
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!auth) {
      setError('Firebase not initialized');
      return;
    }

    setLoading2(true);
    setError('');

    try {
      const verifier = setupRecaptcha();
      const fullPhoneNumber = '+91' + phoneNumber;
      
      const result = await signInWithPhoneNumber(auth, fullPhoneNumber, verifier);
      setConfirmationResult(result);
      setOtpSent(true);
      console.log('[v0] OTP sent to', fullPhoneNumber);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
      console.error('[v0] Error sending OTP:', err);
    } finally {
      setLoading2(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading2(true);
    setError('');

    try {
      await confirmationResult.confirm(otp);
      console.log('[v0] OTP verified successfully');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
      console.error('[v0] Error verifying OTP:', err);
    } finally {
      setLoading2(false);
    }
  };

  const handleResendOTP = async () => {
    setPhoneNumber('');
    setOtp('');
    setOtpSent(false);
    setConfirmationResult(null);
    setError('');
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
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
      loginBtn: 'Login with Mobile Number',
      phoneLabel: 'Enter 10-digit mobile number',
      phonePlaceholder: '9876543210',
      otpLabel: 'Enter 6-digit OTP',
      otpPlaceholder: '000000',
      sendOTPBtn: 'Send OTP',
      verifyOTPBtn: 'Verify OTP',
      resendBtn: 'Resend OTP',
      otpSent: 'OTP sent to your mobile number',
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
      loginBtn: 'मोबाइल नंबर से लॉगिन करें',
      phoneLabel: '10 अंकों का मोबाइल नंबर दर्ज करें',
      phonePlaceholder: '9876543210',
      otpLabel: '6 अंकों का OTP दर्ज करें',
      otpPlaceholder: '000000',
      sendOTPBtn: 'OTP भेजें',
      verifyOTPBtn: 'OTP सत्यापित करें',
      resendBtn: 'OTP फिर से भेजें',
      otpSent: 'OTP आपके मोबाइल नंबर पर भेजा गया',
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
            padding: '20px',
          }}
        >
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
              {t.appName}
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, textAlign: 'center', marginBottom: '40px' }}>
              {t.tagline}
            </p>

            {/* Phone Input Section */}
            {!otpSent ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500' }}>
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhoneNumber(value);
                    }}
                    disabled={loading2}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      fontSize: '16px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--card)',
                      color: 'var(--text)',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {error && (
                  <div style={{ padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', color: '#ef4444', fontSize: '0.9rem' }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSendOTP}
                  disabled={loading2 || phoneNumber.length !== 10}
                  style={{
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: phoneNumber.length === 10 ? 'var(--accent)' : 'rgba(99, 102, 241, 0.5)',
                    color: 'white',
                    cursor: phoneNumber.length === 10 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    opacity: loading2 ? 0.7 : 1,
                  }}
                  onMouseOver={(e) => {
                    if (!loading2 && phoneNumber.length === 10) {
                      (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.target as HTMLButtonElement).style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.target as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {loading2 ? 'Sending...' : t.sendOTPBtn}
                </button>

                {/* reCAPTCHA Container */}
                <div id="recaptcha-container"></div>
              </div>
            ) : (
              /* OTP Input Section */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ padding: '10px', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', color: '#22c55e', fontSize: '0.9rem', textAlign: 'center' }}>
                  {t.otpSent}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500' }}>
                    {t.otpLabel}
                  </label>
                  <input
                    type="tel"
                    placeholder={t.otpPlaceholder}
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                    }}
                    disabled={loading2}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      fontSize: '16px',
                      letterSpacing: '2px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--card)',
                      color: 'var(--text)',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {error && (
                  <div style={{ padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', color: '#ef4444', fontSize: '0.9rem' }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading2 || otp.length !== 6}
                  style={{
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: otp.length === 6 ? 'var(--accent)' : 'rgba(99, 102, 241, 0.5)',
                    color: 'white',
                    cursor: otp.length === 6 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    opacity: loading2 ? 0.7 : 1,
                  }}
                  onMouseOver={(e) => {
                    if (!loading2 && otp.length === 6) {
                      (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.target as HTMLButtonElement).style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.target as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  {loading2 ? 'Verifying...' : t.verifyOTPBtn}
                </button>

                <button
                  onClick={handleResendOTP}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    border: '1px solid var(--accent)',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: 'var(--accent)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {t.resendBtn}
                </button>
              </div>
            )}
          </div>
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
