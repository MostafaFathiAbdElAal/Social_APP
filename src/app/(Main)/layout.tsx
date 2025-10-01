"use client"
import Navbar from "@/components/Navbar/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-screen p-2">

      {children}
      </main>
    </>
  )
}
