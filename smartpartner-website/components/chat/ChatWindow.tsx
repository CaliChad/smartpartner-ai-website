'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WEBHOOK_URL =
  'https://undazzling-lydia-nondictatorially.ngrok-free.dev/webhook/8fd946bf-76b1-472b-b702-5fe37d57dc9d/chat';

const SUGGESTIONS = [
  'What automation services do you offer?',
  'How much does it cost to get started?',
  'Can you automate my business workflows?',
  'Tell me about the AI Audit',
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  feedback?: 'up' | 'down' | null;
}

// ── Typing Indicator (audio-wave style) ─────────────────────────
function TypingWave() {
  return (
    <div className="flex items-end gap-[3px] h-5 px-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-primary to-violet"
          animate={{ height: ['4px', '16px', '4px'] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.08,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Sound helper ────────────────────────────────────────────────
function playBlip() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.value = 0.04;
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    /* silently fail if AudioContext unavailable */
  }
}

// ── Main ChatWindow ─────────────────────────────────────────────
export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMsgId, setTypingMsgId] = useState<string | null>(null);
  const [typingIdx, setTypingIdx] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [soundOn, setSoundOn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Init session + load history ───────────────────────────────
  useEffect(() => {
    let sid = localStorage.getItem('sp-chat-session');
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem('sp-chat-session', sid);
    }
    setSessionId(sid);

    const saved = localStorage.getItem('sp-chat-messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        /* ignore corrupt data */
      }
    }
  }, []);

  // ── Persist messages ──────────────────────────────────────────
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('sp-chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // ── Auto-scroll ───────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingIdx]);

  // ── Typing animation ─────────────────────────────────────────
  useEffect(() => {
    if (!typingMsgId) return;
    const msg = messages.find((m) => m.id === typingMsgId);
    if (!msg || typingIdx >= msg.content.length) {
      setTypingMsgId(null);
      return;
    }
    const speed = typingIdx < 80 ? 14 : typingIdx < 250 ? 8 : 4;
    const chars = typingIdx < 80 ? 2 : typingIdx < 250 ? 4 : 8;
    const timer = setTimeout(() => {
      setTypingIdx((p) => Math.min(p + chars, msg.content.length));
    }, speed);
    return () => clearTimeout(timer);
  }, [typingMsgId, typingIdx, messages]);

  // ── Auto-resize textarea ──────────────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    }
  };

  // ── Send message ──────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || isLoading) return;

      if (soundOn) playBlip();

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: msg,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
      setIsLoading(true);

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({ chatInput: msg, sessionId }),
        });

        // Flexible response parsing for n8n webhooks
        let aiText = '';
        const raw = await res.text();
        try {
          const data = JSON.parse(raw);
          if (typeof data === 'string') {
            aiText = data;
          } else if (data.output) {
            aiText = data.output;
          } else if (data.response) {
            aiText = data.response;
          } else if (data.text) {
            aiText = data.text;
          } else if (data.message) {
            aiText = data.message;
          } else if (Array.isArray(data)) {
            aiText =
              data[0]?.output ||
              data[0]?.text ||
              data[0]?.message ||
              JSON.stringify(data);
          } else {
            aiText = JSON.stringify(data);
          }
        } catch {
          aiText = raw;
        }

        const aiMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: aiText,
          timestamp: Date.now(),
          feedback: null,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setTypingMsgId(aiMsg.id);
        setTypingIdx(0);
        if (soundOn) playBlip();
      } catch {
        const errMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again, or reach out directly via WhatsApp at +254 725 607 750.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errMsg]);
        setTypingMsgId(errMsg.id);
        setTypingIdx(0);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, sessionId, soundOn],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, feedback: m.feedback === type ? null : type } : m,
      ),
    );
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('sp-chat-messages');
    localStorage.removeItem('sp-chat-session');
    const newSid = crypto.randomUUID();
    localStorage.setItem('sp-chat-session', newSid);
    setSessionId(newSid);
  };

  const showWelcome = messages.length === 0;

  // ── Render ────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-24 right-6 z-[9998] w-[400px] max-w-[calc(100vw-24px)] sm:max-w-[calc(100vw-48px)] h-[min(600px,calc(100vh-120px))] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.08] flex flex-col max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-full max-sm:rounded-none"
      style={{
        background: 'rgba(11, 15, 26, 0.97)',
        backdropFilter: 'blur(24px)',
      }}
      role="dialog"
      aria-label="Chat with SmartPartner AI"
    >
      {/* ═══════════ HEADER ═══════════ */}
      <div className="relative px-4 py-3.5 border-b border-white/[0.06] flex items-center justify-between shrink-0 overflow-hidden">
        {/* Gradient shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet/5 to-transparent pointer-events-none" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-xs">SP</span>
          </div>
          <div>
            <div className="font-semibold text-white text-sm leading-tight">
              SmartPartner AI
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-slate-400">
                Online &middot; 24/7 Support
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-1">
          {/* Sound toggle */}
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
            title={soundOn ? 'Mute sounds' : 'Enable sounds'}
            aria-label={soundOn ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundOn ? (
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            )}
          </button>

          {/* Clear chat */}
          <button
            onClick={clearHistory}
            className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
            title="New conversation"
            aria-label="New conversation"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
          </button>

          {/* Close / minimize */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
            aria-label="Minimize chat"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* ═══════════ MESSAGES AREA ═══════════ */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chat-scrollbar">
        {showWelcome ? (
          /* ─── Welcome Screen ─── */
          <div className="flex flex-col items-center justify-center h-full text-center px-2">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-violet flex items-center justify-center mb-5 shadow-xl shadow-primary/25"
            >
              <span className="text-2xl text-white font-bold">SP</span>
              {/* Orbiting dot */}
              <motion.div
                className="absolute w-2.5 h-2.5 rounded-full bg-accent shadow-lg shadow-accent/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ top: -4, left: '50%', transformOrigin: '0 36px' }}
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-bold text-white mb-1.5"
            >
              Hey there! 👋
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-sm mb-6 max-w-[280px] leading-relaxed"
            >
              I&apos;m your AI automation assistant. Ask me anything about
              automating your business — I&apos;m here 24/7.
            </motion.p>

            {/* Suggestion buttons */}
            <div className="w-full space-y-2">
              {SUGGESTIONS.map((s, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  onClick={() => sendMessage(s)}
                  className="group w-full text-left px-4 py-3 rounded-xl text-sm text-slate-300 border border-white/[0.06] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-200 flex items-center justify-between"
                >
                  <span>{s}</span>
                  <svg
                    className="w-4 h-4 text-slate-600 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          /* ─── Message Thread ─── */
          <>
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const isTyping = msg.id === typingMsgId;
              const displayText = isTyping
                ? msg.content.slice(0, typingIdx)
                : msg.content;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {isUser ? (
                    /* ── User Bubble ── */
                    <div className="group max-w-[82%]">
                      <div className="rounded-2xl rounded-tr-md px-4 py-3 text-sm text-white leading-relaxed bg-gradient-to-br from-primary to-violet shadow-lg shadow-primary/10">
                        {msg.content}
                      </div>
                      <div className="flex justify-end mt-1 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-[10px] text-slate-600">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* ── AI Bubble ── */
                    <div className="group max-w-[88%] flex items-start gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-primary/15">
                        <span className="text-white font-bold text-[10px]">
                          SP
                        </span>
                      </div>
                      <div>
                        <div
                          className="rounded-2xl rounded-tl-md px-4 py-3 text-sm text-slate-200 leading-relaxed border border-white/[0.04]"
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        >
                          {/* Render with basic line breaks */}
                          {displayText.split('\n').map((line, li) => (
                            <span key={li}>
                              {li > 0 && <br />}
                              {line}
                            </span>
                          ))}
                          {/* Blinking cursor while typing */}
                          {isTyping && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                              }}
                              className="inline-block w-[2px] h-4 bg-primary ml-0.5 align-middle rounded-full"
                            />
                          )}
                        </div>
                        {/* Feedback + timestamp row */}
                        {!isTyping && (
                          <div className="flex items-center gap-1 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleFeedback(msg.id, 'up')}
                              className={`p-1 rounded transition-colors ${
                                msg.feedback === 'up'
                                  ? 'text-green-400'
                                  : 'text-slate-600 hover:text-slate-400'
                              }`}
                              aria-label="Good response"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23M6.633 10.25H5.125M6.633 10.25c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C4.137 1.953 4.917 1.5 5.75 1.5h.096c.5 0 .905.405.905.905 0 .714-.211 1.412-.608 2.006L4.75 6.25" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleFeedback(msg.id, 'down')}
                              className={`p-1 rounded transition-colors ${
                                msg.feedback === 'down'
                                  ? 'text-red-400'
                                  : 'text-slate-600 hover:text-slate-400'
                              }`}
                              aria-label="Bad response"
                            >
                              <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23M6.633 10.25H5.125M6.633 10.25c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C4.137 1.953 4.917 1.5 5.75 1.5h.096c.5 0 .905.405.905.905 0 .714-.211 1.412-.608 2.006L4.75 6.25" />
                              </svg>
                            </button>
                            <span className="text-[10px] text-slate-600 ml-2">
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Loading / typing indicator */}
            <AnimatePresence>
              {isLoading && !typingMsgId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-[10px]">SP</span>
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-md px-4 py-3 border border-white/[0.04]"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <TypingWave />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* ═══════════ INPUT AREA ═══════════ */}
      <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about automation..."
              rows={1}
              className="w-full resize-none rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder-slate-500 border border-white/[0.08] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                maxHeight: '120px',
              }}
              aria-label="Type your message"
            />
          </div>

          {/* Send button */}
          <motion.button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet text-white flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed transition-opacity shrink-0 shadow-lg shadow-primary/20"
            aria-label="Send message"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </motion.button>
        </div>

        {/* Powered by footer */}
        <div className="text-center mt-2">
          <span className="text-[10px] text-slate-600">
            Powered by SmartPartner AI
          </span>
        </div>
      </div>
    </motion.div>
  );
}
