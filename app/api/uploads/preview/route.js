// app/api/uploads/preview/route.js

import { NextResponse } from 'next/server';

// 🛠️ Mock function สำหรับสร้างเอกสารตัวอย่างที่มีลายน้ำ
async function generateWatermarkedDocument(data) {
  console.log('[Mock Service] Generating watermarked document for service:', data.service);

  const mockUrl = `https://via.placeholder.com/800x600.png?text=DRAFT+FOR+${data.service.toUpperCase().replace(/\s/g, '+')}`;

  return {
    url: mockUrl,
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, destination, date, service, ...otherData } = body;

    if (!service) {
      return NextResponse.json({ message: 'Missing service type' }, { status: 400 });
    }

    const result = await generateWatermarkedDocument({
      name,
      destination,
      date,
      service,
      user: 'Guest_User',
      isWatermarked: true,
      ...otherData,
    });

    return NextResponse.json(
      {
        success: true,
        watermarkedImageUrl: result.url,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json({ message: 'Failed to generate document preview.' }, { status: 500 });
  }
}
