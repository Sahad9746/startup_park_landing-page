import { NextResponse } from 'next/server';
import { getRegistrations } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paramPasscode = searchParams.get('passcode');
    const headerPasscode = request.headers.get('x-admin-passcode');

    const expectedPasscode = process.env.ADMIN_PASSCODE || 'admin2026';

    if (paramPasscode !== expectedPasscode && headerPasscode !== expectedPasscode) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const registrations = getRegistrations();
    
    // Sort registrations: latest first
    const sorted = [...registrations].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, registrations: sorted });
  } catch (error) {
    console.error('Admin Fetch registrations API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch registrations.' },
      { status: 500 }
    );
  }
}
