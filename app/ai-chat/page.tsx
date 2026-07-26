'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AIChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI Chat assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'This is a demo response. AI Chat integration coming soon!' }]);
      }, 500);
      setInput('');
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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>💬 AI Chat</h1>
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

      {/* Chat Container */}
      <div
        style={{
          maxWidth: '800px',
          margin: '30px auto',
          padding: '20px',
          height: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: 'var(--card)',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                padding: '12px 15px',
                borderRadius: '10px',
                backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'rgba(99, 102, 241, 0.2)',
                color: msg.role === 'user' ? 'white' : 'var(--text)',
              }}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: '12px 15px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--card)',
              color: 'var(--text)',
              fontSize: '16px',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: 'var(--accent)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
