import { NextResponse } from 'next/server';
import { saveRegistration } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      company,
      jobTitle,
      industry,
      referral,
      dietary,
      requirements,
      isFundraising,
      investmentStage,
      helpNeeded,
    } = body;

    // Server-side validation
    const errors: Record<string, string> = {};

    if (!fullName || fullName.trim() === '') {
      errors.fullName = 'Full Name is required.';
    }
    
    if (!email || email.trim() === '') {
      errors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please provide a valid email address.';
      }
    }

    if (!phone || phone.trim() === '') {
      errors.phone = 'Phone Number is required.';
    } else {
      // Basic phone format check
      const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Please provide a valid phone number.';
      }
    }

    if (!company || company.trim() === '') {
      errors.company = 'Company/Organization is required.';
    }

    if (!jobTitle || jobTitle.trim() === '') {
      errors.jobTitle = 'Job Title/Role is required.';
    }

    if (!industry || industry === '') {
      errors.industry = 'Industry/Sector is required.';
    }

    if (!referral || referral === '') {
      errors.referral = 'Please select how you heard about us.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Save to file database
    const saved = saveRegistration({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company.trim(),
      jobTitle: jobTitle.trim(),
      industry,
      referral,
      dietary: Array.isArray(dietary) ? dietary : [],
      requirements: requirements ? requirements.trim() : '',
      isFundraising: Boolean(isFundraising),
      investmentStage: investmentStage || '',
      helpNeeded: helpNeeded ? helpNeeded.trim() : '',
    });

    return NextResponse.json({ success: true, registration: saved }, { status: 201 });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
