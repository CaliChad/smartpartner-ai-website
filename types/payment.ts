export type PackageId = 'starter' | 'growth' | 'enterprise' | 'ai-audit';

export interface PackageConfig {
  id: PackageId;
  name: string;
  description: string;
  minAmountUSD: number;
  maxAmountUSD: number;
  isFixed: boolean;
}

export interface PaymentFormData {
  name: string;
  email: string;
  phone: string;
  packageId: PackageId;
  amountUSD: number;
}

export interface PaymentContextType {
  openPaymentModal: (packageId?: PackageId) => void;
  closePaymentModal: () => void;
  isModalOpen: boolean;
  selectedPackage: PackageId | null;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  data?: {
    reference: string;
    amount: number;
    currency: string;
    status: string;
    paidAt: string;
    channel: string;
    customerEmail: string;
  };
}

export interface PaystackTransactionResult {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

export interface PaystackNewTransactionOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  reference?: string;
  metadata?: Record<string, unknown>;
  channels?: string[];
  onSuccess: (transaction: PaystackTransactionResult) => void;
  onLoad?: (response: unknown) => void;
  onCancel: () => void;
  onError?: (error: { message: string }) => void;
}

declare global {
  interface Window {
    PaystackPop?: new () => {
      newTransaction: (options: PaystackNewTransactionOptions) => void;
    };
  }
}

export {};
