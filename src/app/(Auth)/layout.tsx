"use client"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>
    
    <main className="container mx-auto min-h-screen sm:p-2">

        {children}
    </main>
    </>
}
