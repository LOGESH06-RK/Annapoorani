import React, { useState, useRef, useEffect } from 'react';

// ─── Inject styles once ───────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --saffron: #e67e22;
    --crimson: #c0392b;
    --gold: #f0a500;
    --cream: #fdf6ec;
    --dark: #2c1a0e;
    --text: #3b1a08;
    --border: #e6c98a;
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Lato', sans-serif; background: var(--cream); color: var(--text); }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(44,26,14,0.97); backdrop-filter: blur(8px);
    border-bottom: 2px solid var(--gold);
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; gap: 2rem; padding: 0.75rem 2rem;
  }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-emblem {
    position: relative; width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
  }
  .brand-ring {
    position: absolute; inset: 0; border-radius: 50%;
    border: 2px solid var(--gold); animation: spin 12s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .om { font-size: 22px; position: relative; z-index: 1; }
  .brand-name { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 18px; letter-spacing: 0.12em; }
  .brand-sub { color: #b89a72; font-size: 11px; letter-spacing: 0.2em; }
  .nav-links { display: flex; gap: 2rem; list-style: none; margin-left: auto; }
  .nav-links a { color: #e8d5b0; text-decoration: none; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
  .nav-links a:hover { color: var(--gold); }
  .cart-btn {
    display: flex; align-items: center; gap: 6px;
    background: var(--crimson); border: none; color: white;
    padding: 8px 16px; border-radius: 20px; cursor: pointer;
    font-size: 13px; font-weight: 700; letter-spacing: 0.05em; transition: background 0.2s;
  }
  .cart-btn:hover { background: var(--saffron); }
  .cart-badge {
    background: var(--gold); color: var(--dark); border-radius: 50%;
    width: 18px; height: 18px; font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  /* HERO */
  .hero {
    position: relative; min-height: 92vh;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    background: linear-gradient(160deg, #2c1a0e 0%, #4a2010 40%, #7a3010 100%);
  }
  .hero-bg-pattern {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(45deg,rgba(240,165,0,.04) 0,rgba(240,165,0,.04) 1px,transparent 1px,transparent 40px);
  }
  .hero-lotus-left, .hero-lotus-right {
    position: absolute; top: 50%; transform: translateY(-50%);
    font-size: 160px; opacity: 0.06; pointer-events: none;
  }
  .hero-lotus-left { left: -40px; }
  .hero-lotus-right { right: -40px; }
  .hero-content { position: relative; z-index: 1; text-align: center; max-width: 700px; padding: 2rem; }
  .hero-eyebrow { color: var(--gold); letter-spacing: 0.3em; font-size: 13px; text-transform: uppercase; margin-bottom: 1rem; opacity: .9; }
  .hero-tamil { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem,7vw,5rem); color: var(--gold); line-height: 1.1; text-shadow: 0 2px 20px rgba(240,165,0,.3); }
  .hero-eng { font-size: clamp(1.1rem,3vw,1.6rem); color: #e8d5b0; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; margin-top: .5rem; }
  .hero-desc { color: #c4a882; margin: 1.5rem auto; max-width: 480px; line-height: 1.8; font-size: 15px; }
  .hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: linear-gradient(135deg,var(--crimson),var(--saffron)); color: white;
    border: none; padding: 14px 32px; border-radius: 30px; font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: .05em; transition: transform .2s,box-shadow .2s;
    box-shadow: 0 4px 20px rgba(192,57,43,.4);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(192,57,43,.5); }
  .btn-outline {
    background: transparent; border: 2px solid var(--gold); color: var(--gold);
    padding: 13px 32px; border-radius: 30px; font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: .05em; transition: all .2s;
  }
  .btn-outline:hover { background: var(--gold); color: var(--dark); }

  /* SECTIONS */
  .section-header { font-family: 'Playfair Display', serif; font-size: 2.2rem; text-align: center; margin-bottom: 2.5rem; color: var(--dark); }
  .section-header span { color: var(--crimson); }

  /* CHAT FAB */
  .chat-fab {
    position: fixed; bottom: 28px; right: 28px; z-index: 1000;
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg,var(--crimson),var(--saffron));
    color: #fff; border: none; border-radius: 50px;
    padding: 14px 20px; font-size: 20px; cursor: pointer;
    box-shadow: 0 6px 24px rgba(192,57,43,.45); transition: transform .2s,box-shadow .2s;
  }
  .chat-fab:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(192,57,43,.55); }
  .chat-fab--open { padding: 14px 18px; font-size: 16px; border-radius: 50%; }
  .chat-fab-label { font-size: 14px; font-weight: 700; letter-spacing: .03em; }

  /* CHAT WINDOW */
  .chat-window {
    position: fixed; bottom: 96px; right: 28px; z-index: 999;
    width: 360px; max-height: 540px;
    display: flex; flex-direction: column;
    background: var(--cream); border: 1px solid var(--border);
    border-radius: 18px; overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,.18);
    animation: chatSlideUp .25s ease;
  }
  @keyframes chatSlideUp { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:none} }

  .chat-win-header {
    display: flex; align-items: center; gap: 10px; padding: 14px 16px;
    background: linear-gradient(135deg,var(--crimson),var(--saffron)); color: white;
  }
  .chat-win-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .chat-win-name { font-size: 14px; font-weight: 700; letter-spacing: .02em; }
  .chat-win-status { display: flex; align-items: center; gap: 5px; font-size: 11px; opacity: .85; }
  .chat-win-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8e6a3; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .chat-win-close {
    margin-left: auto; background: rgba(255,255,255,.15); border: none; color: white;
    width: 28px; height: 28px; border-radius: 50%; cursor: pointer; font-size: 13px;
    display: flex; align-items: center; justify-content: center; transition: background .15s;
  }
  .chat-win-close:hover { background: rgba(255,255,255,.3); }

  .chat-win-messages {
    flex: 1; overflow-y: auto; padding: 14px 12px;
    display: flex; flex-direction: column; gap: 12px;
    scrollbar-width: thin; scrollbar-color: var(--border) transparent;
  }
  .chat-win-messages::-webkit-scrollbar { width: 4px; }
  .chat-win-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .chat-msg-row { display: flex; align-items: flex-end; gap: 8px; animation: fadeUp .18s ease; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
  .chat-msg-row--user { flex-direction: row-reverse; }
  .chat-msg-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    background: #fde8c8; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; flex-shrink: 0;
  }
  .chat-msg-bubble { max-width: 78%; padding: 9px 13px; border-radius: 16px; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
  .chat-msg-bubble--assistant { background: #fff; color: var(--text); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
  .chat-msg-bubble--user { background: linear-gradient(135deg,var(--crimson),var(--saffron)); color: white; border-bottom-right-radius: 4px; }

  .chat-msg-typing { display: flex; gap: 5px; align-items: center; padding: 12px 14px; }
  .chat-msg-typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--crimson); animation: bounce 1.1s infinite; }
  .chat-msg-typing span:nth-child(2) { animation-delay: .18s; }
  .chat-msg-typing span:nth-child(3) { animation-delay: .36s; }
  @keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-5px);opacity:1} }

  .chat-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 12px 10px; }
  .chat-suggestion-chip {
    background: #fde8c8; border: 1px solid var(--border); border-radius: 20px;
    color: #7a3010; font-size: 11.5px; padding: 5px 11px; cursor: pointer;
    transition: background .15s; font-family: 'Lato', sans-serif;
  }
  .chat-suggestion-chip:hover { background: #f9d49a; }

  .chat-win-input-area { display: flex; align-items: flex-end; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--border); background: #fff8ee; }
  .chat-win-input {
    flex: 1; background: #fff; border: 1px solid var(--border); border-radius: 10px;
    color: var(--text); font-family: 'Lato', sans-serif; font-size: 13px;
    padding: 9px 12px; resize: none; outline: none;
    line-height: 1.5; max-height: 90px; overflow-y: auto; transition: border-color .15s;
  }
  .chat-win-input::placeholder { color: #b89a72; }
  .chat-win-input:focus { border-color: var(--crimson); }
  .chat-win-input:disabled { opacity: .5; cursor: not-allowed; }
  .chat-win-send {
    width: 38px; height: 38px; border-radius: 10px;
    background: linear-gradient(135deg,var(--crimson),var(--saffron));
    border: none; color: white; font-size: 14px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: transform .15s,opacity .15s;
  }
  .chat-win-send:hover:not(:disabled) { transform: scale(1.06); }
  .chat-win-send:disabled { opacity: .4; cursor: not-allowed; }

  @media (max-width: 480px) {
    .chat-window { right: 12px; left: 12px; width: auto; bottom: 88px; }
    .chat-fab { right: 16px; bottom: 20px; }
    .nav-links { display: none; }
  }
`;

if (!document.getElementById('annapoorani-styles')) {
  const style = document.createElement('style');
  style.id = 'annapoorani-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Gemini 2.5 Flash API ─────────────────────────────────────────────────────
const GEMINI_URL = () =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION =
  'You are a warm and helpful assistant for Annapoorani, an authentic Tamil restaurant. ' +
  'Help customers with menu queries, dish recommendations, ingredients, spice levels, ' +
  'reservations, opening hours (Monday–Sunday, 8am–10pm), and Tamil cuisine information. ' +
  'Be friendly, concise, and occasionally use a Tamil greeting like வணக்கம் or நன்றி.';

async function callGemini(history: Message[], userText: string): Promise<string> {
  const contents = [
    ...history.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: userText }] },
  ];

  const res = await fetch(GEMINI_URL(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents,
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? 'Gemini API error');

  // 2.5-flash may return multiple parts; find the text part
  const parts: { text?: string }[] = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find((p) => p.text !== undefined);
  return textPart?.text ?? 'Sorry, no response received.';
}

// ─── Chatbot Widget ───────────────────────────────────────────────────────────
const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'வணக்கம்! Welcome to Annapoorani 🍛\nI can help with our menu, reservations, timings & more. How can I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    const snapshot = [...messages, userMsg];
    setMessages(snapshot);
    setInput('');
    setLoading(true);

    try {
      const reply = await callGemini(messages, trimmed);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ Error: ${msg}\nCheck VITE_GEMINI_API_KEY in .env` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle chat"
      >
        {open ? '✕' : '🍛'}
        {!open && <span className="chat-fab-label">Ask Us</span>}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-win-header">
            <div className="chat-win-avatar">🍛</div>
            <div>
              <div className="chat-win-name">Annapoorani Assistant</div>
              <div className="chat-win-status">
                <span className="chat-win-dot" /> Online · Gemini 2.5 Flash
              </div>
            </div>
            <button className="chat-win-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-win-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg-row chat-msg-row--${msg.role}`}>
                {msg.role === 'assistant' && <div className="chat-msg-avatar">🍛</div>}
                <div className={`chat-msg-bubble chat-msg-bubble--${msg.role}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg-row chat-msg-row--assistant">
                <div className="chat-msg-avatar">🍛</div>
                <div className="chat-msg-bubble chat-msg-bubble--assistant chat-msg-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="chat-suggestions">
              {["Today's specials?", 'How to reserve a table?', 'What are your hours?'].map((s) => (
                <button key={s} className="chat-suggestion-chip" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="chat-win-input-area">
            <textarea
              className="chat-win-input"
              rows={1}
              placeholder="Ask about menu, timings…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button
              className="chat-win-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
const App: React.FC = () => (
  <div className="app">
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <div className="brand-emblem">
            <div className="brand-ring" />
            <span className="om">🍛</span>
          </div>
          <div className="brand-text">
            <div className="brand-name">ANNAPOORANI</div>
            <div className="brand-sub">Tamil Restaurant</div>
          </div>
        </div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#specialties">Specialties</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="cart-btn">
          <span role="img" aria-label="cart">🛒</span>
          <span>Cart</span>
          <span className="cart-badge">0</span>
        </button>
      </div>
    </nav>

    <section id="hero" className="hero">
      <div className="hero-bg-pattern" />
      <div className="hero-lotus-left">🌸</div>
      <div className="hero-lotus-right">🌸</div>
      <div className="hero-content">
        <div className="hero-eyebrow">Welcome to</div>
        <div className="hero-title">
          <h1 className="hero-tamil">அன்னைப்பூரணி</h1>
          <h2 className="hero-eng">Authentic Tamil Cuisine</h2>
        </div>
        <p className="hero-desc">
          Experience the rich flavors of South India with our traditional dishes crafted
          from the freshest ingredients.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary">Reserve a Table</button>
          <button className="btn-outline">Explore Menu</button>
        </div>
      </div>
    </section>

    <section id="specialties" style={{ padding: '5rem 2rem', textAlign: 'center', background: '#fff8ee' }}>
      <h2 className="section-header"><span>Our</span> Specialties</h2>
      <p style={{ color: '#7a5c3a' }}>Coming soon...</p>
    </section>

    <section id="menu" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
      <h2 className="section-header"><span>Our</span> Menu</h2>
      <p style={{ color: '#7a5c3a' }}>Coming soon...</p>
    </section>

    <section id="contact" style={{ padding: '5rem 2rem', textAlign: 'center', background: '#fff8ee' }}>
      <h2 className="section-header"><span>Contact</span> Us</h2>
      <p style={{ color: '#7a5c3a' }}>Coming soon...</p>
    </section>

    <Chatbot />
  </div>
);

export default App;