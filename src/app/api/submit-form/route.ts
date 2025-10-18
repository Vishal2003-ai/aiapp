// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb'; // Correctly import your MongoClient helper

// Ensure these are defined in your .env.local file
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || EMAIL_USER; // Email to notify about new submissions

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, course, message, type } = body; // 'type' could be 'enrollment' or 'contact'

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ message: 'Name and Email are required.' }, { status: 400 });
    }

    // Connect to MongoDB using the helper
    const client = await clientPromise;
    const db = client.db('coursehub'); // Your database name

    // Determine collection based on type
    const collectionName = type === 'enrollment' ? 'enrollments' : 'contacts';
    const collection = db.collection(collectionName);
    
    // Insert data
    await collection.insertOne({
      name,
      email,
      phone: phone || null, // Allow phone to be optional
      course: course || null, // Allow course to be optional
      message: message || null, // Allow message to be optional
      type,
      createdAt: new Date()
    });
    
    // --- Send Email Confirmation to User ---
    const userTransporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const userMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: type === 'enrollment' ? 'Enrollment Confirmation - CourseHub' : 'Contact Confirmation - CourseHub',
      html: `
        <h2>Thank you for your ${type === 'enrollment' ? 'enrollment' : 'inquiry'} with CourseHub!</h2>
        <p>Dear ${name},</p>
        <p>We have received your ${type === 'enrollment' ? 'enrollment request' : 'message'} and will get back to you shortly.</p>
        ${course ? `<p><strong>Course:</strong> ${course}</p>` : ''}
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          ${phone ? `<li>Phone: ${phone}</li>` : ''}
        </ul>
        ${message ? `<p><strong>Your Message:</strong><br>${message}</p>` : ''}
        <p>Best regards,<br>CourseHub Team</p>
      `,
    };

    await userTransporter.sendMail(userMailOptions);

    // --- Send Notification Email to Admin ---
    const adminMailOptions = {
        from: EMAIL_USER,
        to: ADMIN_EMAIL, // Send notification to your admin email
        subject: `New ${type === 'enrollment' ? 'Enrollment' : 'Contact'} Submission`,
        html: `
            <h3>New ${type === 'enrollment' ? 'Enrollment' : 'Contact'} Form Submission:</h3>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${course ? `<p><strong>Course:</strong> ${course}</p>` : ''}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            <p>Submitted On: ${new Date().toLocaleString()}</p>
        `,
    };
    await userTransporter.sendMail(adminMailOptions); // Reusing userTransporter is fine

    return NextResponse.json({ message: 'Request processed successfully!' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Failed to process request', error: (error as Error).message }, { status: 500 });
  }
}