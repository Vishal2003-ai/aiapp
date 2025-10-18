'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import EnrollmentForm from '@/components/EnrollmentForm'

export default function Home() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to CourseHub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Transform your career with our world-class courses
        </p>
        <Button size="lg" onClick={() => setShowForm(true)}>
          Join Now
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Expert Instructors</CardTitle>
            <CardDescription>Learn from industry professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Our instructors bring years of real-world experience to help you succeed.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Flexible Learning</CardTitle>
            <CardDescription>Study at your own pace</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access course materials 24/7 and learn on your schedule.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Certification</CardTitle>
            <CardDescription>Get recognized credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Earn certificates that boost your professional profile.</p>
          </CardContent>
        </Card>
      </section>

      <EnrollmentForm 
        open={showForm} 
        onClose={() => setShowForm(false)}
        type="enrollment"
      />
    </div>
  )
}