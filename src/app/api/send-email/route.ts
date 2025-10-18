import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function POST(req: NextRequest) {
  try {
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ message: 'To, subject, and HTML content are required for sending email.' }, { status: 400 });
    }

    // Configure your email transporter
    // Example for Gmail - requires an App Password if 2FA is enabled
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or 'outlook', 'sendgrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to,                      // List of recipients
      subject: subject,            // Subject line
      html: html,                  // HTML body
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.', error: (error as Error).message }, { status: 500 });
  }
}