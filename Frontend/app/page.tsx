"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="text-lg font-bold text-accent-foreground">F</span>
            </div>
            <span className="text-xl font-bold">FinSage</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              AI-Powered Wealth Management Made Simple
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Track your income, assets, liabilities, and credit cards in one place. Get personalized recommendations to
              optimize your financial health.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Everything You Need to Manage Your Wealth</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Income Tracking</h3>
                <p className="text-muted-foreground">Monitor all your income sources and track growth over time.</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Asset Management</h3>
                <p className="text-muted-foreground">Keep track of all your assets and their current values.</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Liability Tracking</h3>
                <p className="text-muted-foreground">Manage debts and liabilities with payment reminders.</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Credit Cards</h3>
                <p className="text-muted-foreground">Track spending, limits, and payment due dates.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FinSage. All rights reserved.</p>
        </div>
      </footer> */}
      <footer className="border-t border-border bg-background py-6">
  <div className="container mx-auto px-4">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
      {/* Left side - Brand Name */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <p className="text-lg font-bold text-foreground">FinSage</p>
      </div>

      {/* Center - Tagline */}
      <div className="text-sm text-muted-foreground text-center md:mr-3">
        AI-Powered Smart Wealth Management
      </div>

      {/* Right side - Copyright */}
      <div className="text-sm text-muted-foreground text-center sm:text-right">
        &copy; 2025 FinSage. All rights reserved.
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}
