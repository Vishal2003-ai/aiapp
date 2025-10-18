import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb'; // Adjust path if necessary
import Contact from '@/models/Contact'; // Adjust path if necessary

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Trigger the email sending API (internal call)
    await fetch(`${req.nextUrl.origin}/api/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: email, subject: 'Thank you for your inquiry!', html: `<p>Dear ${name},</p><p>Thank you for contacting us. We have received your message and will get back to you shortly.</p><p>Your message: "${message}"</p><p>Best regards,<br/>The App Team</p>` }),
    });

    // Also send an internal notification to yourself
    await fetch(`${req.nextUrl.origin}/api/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: process.env.EMAIL_USER, // Send to your own email
            subject: 'New Contact Form Submission',
            html: `<p>A new contact form has been submitted:</p>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        }),
    });


    return NextResponse.json({ message: 'Contact form submitted successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({ message: 'Failed to submit contact form.', error: (error as Error).message }, { status: 500 });
  }
}