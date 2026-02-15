'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { PackageId, PaymentContextType } from '@/types/payment';
import PaymentModal from './PaymentModal';

const PaymentContext = createContext<PaymentContextType | null>(null);

export function usePayment(): PaymentContextType {
  const ctx = useContext(PaymentContext);
  if (!ctx) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return ctx;
}

export default function PaymentProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageId | null>(null);

  const openPaymentModal = useCallback((packageId?: PackageId) => {
    setSelectedPackage(packageId ?? null);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closePaymentModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <PaymentContext.Provider
      value={{ openPaymentModal, closePaymentModal, isModalOpen, selectedPackage }}
    >
      {children}

      <AnimatePresence>
        {isModalOpen && (
          <PaymentModal
            initialPackage={selectedPackage}
            onClose={closePaymentModal}
          />
        )}
      </AnimatePresence>
    </PaymentContext.Provider>
  );
}
