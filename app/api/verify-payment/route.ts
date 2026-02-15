import { NextRequest, NextResponse } from 'next/server';
import { isValidAmountKES, CURRENCY } from '@/lib/packages';
import type { PackageId } from '@/types/payment';

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference || typeof reference !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Missing or invalid reference' },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error('PAYSTACK_SECRET_KEY is not configured');
      return NextResponse.json(
        { success: false, message: 'Payment verification unavailable' },
        { status: 500 }
      );
    }

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status || paystackData.data?.status !== 'success') {
      return NextResponse.json(
        {
          success: false,
          message: paystackData.data?.gateway_response || 'Payment verification failed',
        },
        { status: 400 }
      );
    }

    const txData = paystackData.data;
    const amountInKES = txData.amount / 100;

    if (txData.currency !== CURRENCY) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment currency' },
        { status: 400 }
      );
    }

    const packageId = txData.metadata?.packageId as PackageId | undefined;
    if (packageId && !isValidAmountKES(packageId, amountInKES)) {
      console.warn(
        `Amount mismatch: package=${packageId}, amount=${amountInKES} KES`
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        reference: txData.reference,
        amount: amountInKES,
        currency: txData.currency,
        status: txData.status,
        paidAt: txData.paid_at,
        channel: txData.channel,
        customerEmail: txData.customer?.email,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during verification' },
      { status: 500 }
    );
  }
}
