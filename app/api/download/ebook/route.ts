import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get('ref');

  if (!ref || typeof ref !== 'string') {
    return NextResponse.json(
      { error: 'Payment reference is required' },
      { status: 400 }
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    console.error('PAYSTACK_SECRET_KEY is not configured');
    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 500 }
    );
  }

  try {
    // Verify payment with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const verifyData = await verifyRes.json();

    if (
      !verifyData.status ||
      verifyData.data?.status !== 'success' ||
      verifyData.data?.amount !== 350000
    ) {
      return NextResponse.json(
        { error: 'Payment not verified. Please complete your purchase first.' },
        { status: 403 }
      );
    }

    // Payment verified — serve the PDF
    const filePath = path.join(process.cwd(), 'public', 'Abundance_Intelligence_Final.pdf');
    const fileBuffer = readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Abundance-Intelligence-Blueprint.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your download' },
      { status: 500 }
    );
  }
}
