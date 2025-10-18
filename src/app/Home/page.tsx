import { Navbar } from "@/components/Navigation";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="mt-4">This is the home page content.</p>
        <div className="mt-8"></div>
      </main>
    </div>
  );
}
