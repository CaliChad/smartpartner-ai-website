'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Animated glow ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-[-6px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #F97316)',
              filter: 'blur(12px)',
            }}
            animate={{
              opacity: [0.4, 0.15, 0.4],
              scale: [1, 1.25, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-violet to-primary text-white shadow-2xl shadow-primary/30 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Unread badge */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/40"
            >
              <span className="text-[10px] font-bold text-white">1</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
