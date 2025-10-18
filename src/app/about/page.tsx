export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At CourseHub, we believe in making quality education accessible to everyone. 
            Our mission is to empower learners worldwide with the skills they need to succeed 
            in today's rapidly evolving digital landscape.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2020, CourseHub started with a simple idea: education should be 
            accessible, affordable, and effective. Since then, we've helped thousands of 
            students achieve their career goals through our comprehensive course offerings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Industry-recognized certifications</li>
            <li>Hands-on projects and real-world applications</li>
            <li>Lifetime access to course materials</li>
            <li>Active community support</li>
            <li>Affordable pricing with flexible payment options</li>
          </ul>
        </section>
      </div>
    </div>
  )
}