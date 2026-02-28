'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Gold checkmark */}
        <div className="w-24 h-24 rounded-full bg-[#C9A84C]/10 border-2 border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          You&apos;re in. Your blueprint is ready.
        </h1>

        <p className="text-white/60 text-lg leading-relaxed mb-8">
          Your payment was successful. Click below to download your copy of the Abundance Intelligence blueprint.
        </p>

        {reference ? (
          <a
            href={`/api/download/ebook?ref=${encodeURIComponent(reference)}`}
            className="inline-block px-10 py-4 rounded-xl font-bold text-lg text-[#0D1B2A] bg-[#C9A84C] hover:bg-[#d4b55a] transition-all mb-4"
          >
            Download Your Blueprint (PDF)
          </a>
        ) : (
          <p className="text-white/60 text-base mb-4">
            If you completed your payment but don&apos;t see a download button, please email us with your payment confirmation.
          </p>
        )}

        <p className="text-white/40 text-sm mb-10">
          If the download doesn&apos;t start, click the button again.
        </p>

        <a
          href="https://smartpartnerai.store"
          className="inline-block px-10 py-4 rounded-xl font-bold text-lg text-white/70 border border-white/10 hover:border-white/30 transition-all"
        >
          Back to SmartPartner AI
        </a>

        <p className="text-white/30 text-xs mt-8">
          Questions? Email getsmartpartnerai@gmail.com
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center">
          <div className="text-white/60 text-lg">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
