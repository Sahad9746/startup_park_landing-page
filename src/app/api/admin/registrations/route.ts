import { NextResponse } from 'next/server';
import { getRegistrations, deleteRegistration } from '@/lib/db';

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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const paramPasscode = searchParams.get('passcode');
    const headerPasscode = request.headers.get('x-admin-passcode');

    const expectedPasscode = process.env.ADMIN_PASSCODE || 'admin2026';

    if (paramPasscode !== expectedPasscode && headerPasscode !== expectedPasscode) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing registration ID' }, { status: 400 });
    }

    const deleted = deleteRegistration(id);
    if (deleted) {
      return NextResponse.json({ success: true, message: 'Registration deleted successfully.' });
    } else {
      return NextResponse.json({ success: false, message: 'Registration not found.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Admin Delete registration API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete registration.' },
      { status: 500 }
    );
  }
}

