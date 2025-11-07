"use client"
import Navbar from "@/components/Navbar/Navbar";
export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Navbar />
      <main className="flex justify-center min-h-screen bg-white p-2">
        <section className="max-w-lg w-full sm:p-2">
          {children}
        </section>
      </main>
    </>
  )
}
