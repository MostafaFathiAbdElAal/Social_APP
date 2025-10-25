"use client"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>
    <main className="container mx-auto min-h-screen max-sm:p-1 sm:p-2">

        {children}
    </main>
    </>
}
