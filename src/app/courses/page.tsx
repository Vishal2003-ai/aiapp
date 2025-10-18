'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import EnrollmentForm from '@/components/EnrollmentForm'

export default function Courses() {
  const [showForm, setShowForm] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')

  const courses = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Master HTML, CSS, JavaScript, React, and Node.js',
      duration: '12 weeks',
      price: '₹15,000'
    },
    {
      id: 2,
      title: 'Data Science with Python',
      description: 'Learn Python, pandas, machine learning, and data visualization',
      duration: '16 weeks',
      price: '₹20,000'
    },
    {
      id: 3,
      title: 'Digital Marketing Masterclass',
      description: 'SEO, social media marketing, content strategy, and analytics',
      duration: '8 weeks',
      price: '₹12,000'
    },
    {
      id: 4,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps with React Native',
      duration: '14 weeks',
      price: '₹18,000'
    }
  ]

  const handleEnroll = (courseName: string) => {
    setSelectedCourse(courseName)
    setShowForm(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">Duration: {course.duration}</p>
                <p className="text-2xl font-bold text-blue-600">{course.price}</p>
              </div>
              <Button onClick={() => handleEnroll(course.title)} className="w-full">
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <EnrollmentForm 
        open={showForm} 
        onClose={() => setShowForm(false)}
        type="enrollment"
        courseName={selectedCourse}
      />
    </div>
  )
}