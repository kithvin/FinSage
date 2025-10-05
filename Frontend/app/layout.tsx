import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { FinanceProvider } from "@/lib/finance-context"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "FinSage - AI Wealth Management",
  description: "Manage your finances with AI-powered insights",
  generator: "v0.app",
  icons: {
    icon: "/logo.svg", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <FinanceProvider>{children}</FinanceProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
