'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { usePaystack } from '@/lib/usePaystack';
import { PACKAGES, PACKAGE_ORDER, CURRENCY, usdToKes } from '@/lib/packages';
import type {
  PackageId,
  PaymentFormData,
  PaystackTransactionResult,
  VerifyPaymentResponse,
} from '@/types/payment';

interface PaymentModalProps {
  initialPackage: PackageId | null;
  onClose: () => void;
}

type ModalStep = 'form' | 'processing' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  amount?: string;
}

interface SuccessData {
  reference: string;
  amountKES: number;
  amountUSD: number;
  packageName: string;
}

export default function PaymentModal({ initialPackage, onClose }: PaymentModalProps) {
  const { initiatePayment } = usePaystack();
  const [step, setStep] = useState<ModalStep>('form');
  const [errors, setErrors] = useState<FormErrors>({});
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const defaultPackageId = initialPackage ?? 'ai-audit';
  const defaultPkg = PACKAGES[defaultPackageId];

  const [formData, setFormData] = useState<PaymentFormData>({
    name: '',
    email: '',
    phone: '+254',
    packageId: defaultPackageId,
    amountUSD: defaultPkg.minAmountUSD,
  });

  const selectedPkg = PACKAGES[formData.packageId];
  const amountKES = usdToKes(formData.amountUSD);

  // Reset amount when package changes
  useEffect(() => {
    const pkg = PACKAGES[formData.packageId];
    setFormData(prev => ({ ...prev, amountUSD: pkg.minAmountUSD }));
  }, [formData.packageId]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step === 'form') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [step, onClose]);

  const updateField = <K extends keyof PaymentFormData>(field: K, value: PaymentFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneDigits = formData.phone.replace('+254', '').replace(/\s/g, '');
    if (phoneDigits.length !== 9 || !/^\d{9}$/.test(phoneDigits)) {
      newErrors.phone = 'Enter 9 digits after +254 (e.g., +254712345678)';
    }

    if (!selectedPkg.isFixed) {
      if (formData.amountUSD < selectedPkg.minAmountUSD || formData.amountUSD > selectedPkg.maxAmountUSD) {
        newErrors.amount = `Amount must be between $${selectedPkg.minAmountUSD} and $${selectedPkg.maxAmountUSD}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReference = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `SP-${formData.packageId}-${timestamp}-${random}`;
  };

  const handlePaymentSuccess = useCallback(async (transaction: PaystackTransactionResult) => {
    try {
      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: transaction.reference }),
      });

      const data: VerifyPaymentResponse = await res.json();

      if (data.success) {
        setSuccessData({
          reference: transaction.reference,
          amountKES: amountKES,
          amountUSD: formData.amountUSD,
          packageName: selectedPkg.name,
        });
        setStep('success');
      } else {
        setErrorMessage(data.message || 'Payment verification failed');
        setStep('error');
      }
    } catch {
      setErrorMessage('Could not verify payment. Please contact support with your reference.');
      setStep('error');
    }
  }, [amountKES, formData.amountUSD, selectedPkg.name]);

  const handleSubmit = async () => {
    if (!validate()) return;

    setStep('processing');

    const reference = generateReference();
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      setErrorMessage('Payment configuration error. Please contact support.');
      setStep('error');
      return;
    }

    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || undefined;

    try {
      await initiatePayment({
        key: publicKey,
        email: formData.email,
        amount: amountKES * 100, // Convert to lowest denomination (cents)
        currency: CURRENCY,
        firstName,
        lastName,
        phone: formData.phone,
        reference,
        metadata: {
          packageId: formData.packageId,
          packageName: selectedPkg.name,
          amountUSD: formData.amountUSD,
          customerName: formData.name,
          customerPhone: formData.phone,
        },
        onSuccess: handlePaymentSuccess,
        onCancel: () => setStep('form'),
        onError: (error) => {
          setErrorMessage(error.message || 'Payment failed. Please try again.');
          setStep('error');
        },
      });
    } catch {
      setErrorMessage('Could not initialize payment. Please try again.');
      setStep('error');
    }
  };

  const sliderPercent = selectedPkg.isFixed
    ? 100
    : ((formData.amountUSD - selectedPkg.minAmountUSD) / (selectedPkg.maxAmountUSD - selectedPkg.minAmountUSD)) * 100;

  // ── Form Step ──────────────────────────────────────────────────
  const renderForm = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white">Complete Your Payment</h3>
        <p className="text-slate-400 text-sm mt-1">Secure payment powered by Paystack</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => updateField('name', e.target.value)}
          placeholder="John Doe"
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => updateField('email', e.target.value)}
          placeholder="john@example.com"
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={e => {
            let val = e.target.value;
            if (!val.startsWith('+254')) val = '+254';
            updateField('phone', val);
          }}
          placeholder="+254712345678"
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Package Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Service Package</label>
        <div className="relative">
          <select
            value={formData.packageId}
            onChange={e => updateField('packageId', e.target.value as PackageId)}
            className="w-full rounded-xl px-4 py-3 text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            {PACKAGE_ORDER.map(id => {
              const pkg = PACKAGES[id];
              const priceLabel = pkg.isFixed
                ? `$${pkg.minAmountUSD}`
                : `$${pkg.minAmountUSD}–$${pkg.maxAmountUSD}`;
              return (
                <option key={id} value={id} className="bg-dark-card text-white">
                  {pkg.name} — {priceLabel}
                </option>
              );
            })}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Amount</label>
        {selectedPkg.isFixed ? (
          <div className="rounded-xl px-4 py-3 bg-white/[0.03] border border-white/[0.08]">
            <span className="text-2xl font-bold gradient-text">${selectedPkg.minAmountUSD}</span>
            <span className="text-slate-400 text-sm ml-2">USD</span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-12">${selectedPkg.minAmountUSD}</span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={selectedPkg.minAmountUSD}
                  max={selectedPkg.maxAmountUSD}
                  step={selectedPkg.maxAmountUSD >= 2500 ? 100 : 25}
                  value={formData.amountUSD}
                  onChange={e => updateField('amountUSD', Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F97316 0%, #EF4444 ${sliderPercent}%, rgba(255,255,255,0.06) ${sliderPercent}%)`,
                  }}
                />
              </div>
              <span className="text-xs text-slate-500 w-14 text-right">${selectedPkg.maxAmountUSD.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">$</span>
              <input
                type="number"
                min={selectedPkg.minAmountUSD}
                max={selectedPkg.maxAmountUSD}
                value={formData.amountUSD}
                onChange={e => {
                  const val = Number(e.target.value);
                  if (val >= selectedPkg.minAmountUSD && val <= selectedPkg.maxAmountUSD) {
                    updateField('amountUSD', val);
                  }
                }}
                className="w-24 rounded-lg px-3 py-1.5 text-sm text-white bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 focus:outline-none transition-all"
              />
              <span className="text-slate-400 text-sm">USD</span>
            </div>
            {errors.amount && <p className="text-red-400 text-xs">{errors.amount}</p>}
          </div>
        )}
      </div>

      {/* KES Conversion Display */}
      <div className="rounded-xl px-4 py-3 bg-primary/[0.05] border border-primary/[0.15]">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">You&apos;ll be charged</span>
          <span className="text-white font-semibold">
            {CURRENCY} {amountKES.toLocaleString()}
          </span>
        </div>
        <p className="text-slate-500 text-xs mt-1">
          ~${formData.amountUSD.toLocaleString()} USD at current exchange rate
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="group relative w-full py-4 rounded-xl font-semibold text-lg text-white overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-accent to-[#EF4444] group-hover:opacity-90 transition-opacity" />
        <span className="relative flex items-center justify-center gap-2">
          Pay {CURRENCY} {amountKES.toLocaleString()}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </span>
      </button>

      <p className="text-center text-slate-600 text-xs">
        Secure payment via Paystack. Your card details are never stored on our servers.
      </p>
    </div>
  );

  // ── Processing Step ────────────────────────────────────────────
  const renderProcessing = () => (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-white font-medium">Processing payment...</p>
      <p className="text-slate-400 text-sm">Please complete the payment in the Paystack popup</p>
    </div>
  );

  // ── Success Step ───────────────────────────────────────────────
  const renderSuccess = () => (
    <div className="flex flex-col items-center py-8 space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
      >
        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold gradient-text">Payment Successful!</h3>
        <p className="text-slate-400 text-sm">Thank you for choosing Smart Partner AI</p>
      </div>

      {successData && (
        <div className="w-full space-y-3 rounded-xl p-4 bg-white/[0.03] border border-white/[0.08]">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Reference</span>
            <span className="text-white font-mono text-xs">{successData.reference}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Package</span>
            <span className="text-white">{successData.packageName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Amount</span>
            <span className="text-white">{CURRENCY} {successData.amountKES.toLocaleString()} (~${successData.amountUSD})</span>
          </div>
        </div>
      )}

      <div className="w-full space-y-2 rounded-xl p-4 bg-primary/[0.05] border border-primary/[0.15]">
        <p className="text-white font-medium text-sm">What happens next:</p>
        <ul className="space-y-1.5">
          {[
            "You'll receive a confirmation email shortly",
            'Our team will reach out within 24 hours',
            selectedPkg.id === 'ai-audit' ? "We'll schedule your 60-minute audit session" : "We'll begin your automation setup",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
              <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-accent to-[#EF4444] hover:opacity-90 transition-opacity"
        >
          Done
        </button>
        <a
          href="https://wa.me/254725607750"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl font-semibold text-white border border-white/[0.1] hover:bg-white/[0.06] transition-all text-center"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );

  // ── Error Step ─────────────────────────────────────────────────
  const renderError = () => (
    <div className="flex flex-col items-center py-8 space-y-6">
      <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
        <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-white">Payment Failed</h3>
        <p className="text-slate-400 text-sm">{errorMessage}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={() => { setStep('form'); setErrorMessage(''); }}
          className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-accent to-[#EF4444] hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <a
          href="https://wa.me/254725607750"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl font-semibold text-white border border-white/[0.1] hover:bg-white/[0.06] transition-all text-center"
        >
          Contact Support
        </a>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9990] flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === 'form' ? onClose : undefined}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-dark-card shadow-2xl p-7"
      >
        {/* Close Button */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {step === 'form' && renderForm()}
        {step === 'processing' && renderProcessing()}
        {step === 'success' && renderSuccess()}
        {step === 'error' && renderError()}
      </motion.div>
    </motion.div>
  );
}
