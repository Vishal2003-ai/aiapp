'use client'
import { useState } from 'react'
import EnrollmentForm from '@/components/EnrollmentForm'

export default function Contact() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
              <p className="text-gray-600">
                Have questions? We'd love to hear from you. Click below to send us a message.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2 text-gray-700">
                <p>📧 Email: info@coursehub.com</p>
                <p>📞 Phone: +91 98765 43210</p>
                <p>📍 Address: 123 Learning Street, Mumbai, India</p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      <EnrollmentForm 
        open={showForm} 
        onClose={() => setShowForm(false)}
        type="contact"
      />
    </div>
  )
}