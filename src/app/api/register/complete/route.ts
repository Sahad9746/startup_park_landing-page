import { NextResponse } from 'next/server';
import { completePayment } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Registration ID is required.' }, { status: 400 });
    }

    const updatedRegistration = completePayment(id);

    if (!updatedRegistration) {
      return NextResponse.json({ success: false, message: 'Registration not found.' }, { status: 404 });
    }

    // Format registration data for email/console
    const reg = updatedRegistration;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #C9A227; border-bottom: 2px solid #C9A227; padding-bottom: 8px;">Unicorn Night - Registration &amp; Payment Completed</h2>
        <p>A new registrant has confirmed their payment for the Corporate Dinner Night:</p>
        
        <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
          <tr style="background-color: #f9f9f9;">
            <td style="width: 40%;"><strong>ID</strong></td>
            <td><code>${reg.id}</code></td>
          </tr>
          <tr>
            <td><strong>Full Name</strong></td>
            <td><strong>${reg.fullName}</strong></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Email Address</strong></td>
            <td><a href="mailto:${reg.email}">${reg.email}</a></td>
          </tr>
          <tr>
            <td><strong>Phone Number</strong></td>
            <td>${reg.phone}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Company / Organisation</strong></td>
            <td>${reg.company || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Job Title</strong></td>
            <td>${reg.jobTitle || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Industry</strong></td>
            <td>${reg.industry}</td>
          </tr>
          <tr>
            <td><strong>Referral Source</strong></td>
            <td>${reg.referral}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Dietary Preferences</strong></td>
            <td>${reg.dietary.join(', ') || 'None Specified'}</td>
          </tr>
          <tr>
            <td><strong>Special Requirements</strong></td>
            <td>${reg.requirements || 'None'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Actively Fundraising</strong></td>
            <td>${reg.isFundraising ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td><strong>Investment Stage</strong></td>
            <td>${reg.investmentStage || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Startup Park Help Needed</strong></td>
            <td>${reg.helpNeeded || 'None'}</td>
          </tr>
          <tr>
            <td><strong>Registration Time</strong></td>
            <td>${new Date(reg.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
          </tr>
          <tr style="background-color: #eafaea;">
            <td><strong>Payment Status</strong></td>
            <td><strong style="color: #2e7d32;">COMPLETED &amp; CONFIRMED</strong></td>
          </tr>
        </table>
        
        <p style="font-size: 0.8rem; color: #777; margin-top: 20px; text-align: center; border-top: 1px dashed #ccc; padding-top: 10px;">
          Startup Park dinner registration database.
        </p>
      </div>
    `;

    // Attempt to send email via SMTP if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      console.log(`Sending registration confirmation email for ${reg.fullName} to delwin@iquecap.com...`);
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || smtpUser,
          to: 'delwin@iquecap.com',
          subject: `Unicorn Night Paid RSVP: ${reg.fullName} (${reg.company || 'Individual'})`,
          html: emailHtml,
        });

        console.log(`Email successfully sent to delwin@iquecap.com for registration ${reg.id}.`);
      } catch (mailError) {
        console.error('SMTP Mailer failed to send email:', mailError);
        // We do not fail the request if mail fails, to avoid disrupting the user experience
      }
    } else {
      console.warn('SMTP Credentials are not fully configured in environment variables. Logging registration data to server stdout instead:');
      console.log('--- NEW COMPLETED REGISTRATION DETAILS ---');
      console.log(JSON.stringify(reg, null, 2));
      console.log('-------------------------------------------');
    }

    return NextResponse.json({ success: true, registration: reg }, { status: 200 });
  } catch (error) {
    console.error('Complete Payment API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
