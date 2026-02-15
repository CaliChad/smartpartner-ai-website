'use client';

import { useCallback, useRef } from 'react';
import type { PaystackNewTransactionOptions } from '@/types/payment';

const PAYSTACK_SCRIPT_URL = 'https://js.paystack.co/v2/inline.js';

export function usePaystack() {
  const scriptLoaded = useRef(false);

  const loadScript = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (scriptLoaded.current && window.PaystackPop) {
        resolve();
        return;
      }

      const existing = document.querySelector(
        `script[src="${PAYSTACK_SCRIPT_URL}"]`
      );
      if (existing) {
        if (window.PaystackPop) {
          scriptLoaded.current = true;
          resolve();
          return;
        }
        existing.addEventListener('load', () => {
          scriptLoaded.current = true;
          resolve();
        });
        return;
      }

      const script = document.createElement('script');
      script.src = PAYSTACK_SCRIPT_URL;
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.head.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async (options: PaystackNewTransactionOptions) => {
      await loadScript();
      if (!window.PaystackPop) {
        throw new Error('Paystack SDK not available');
      }
      const popup = new window.PaystackPop();
      popup.newTransaction(options);
    },
    [loadScript]
  );

  return { initiatePayment };
}
