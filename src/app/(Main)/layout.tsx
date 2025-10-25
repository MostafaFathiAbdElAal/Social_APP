"use client"
import Navbar from "@/components/Navbar/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="grid grid-cols-14 min-h-screen bg-white p-2">
        <div className="col-span-4">

       

        </div>
        <section className="col-span-6  p-2">

          {children}
        </section>
        <div className="col-span-4">

        </div>
      </main>
    </>
  )
}
