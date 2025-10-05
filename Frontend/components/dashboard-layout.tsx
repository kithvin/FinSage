"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  DollarSign,
  Building2,
  FileText,
  CreditCard,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Chatbot } from "@/components/chatbot"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/income", label: "Income", icon: DollarSign },
    { href: "/assets", label: "Assets", icon: Building2 },
    { href: "/liabilities", label: "Liabilities", icon: FileText },
    { href: "/credit-cards", label: "Credit Cards", icon: CreditCard },
    { href: "/recommendations", label: "Recommendations", icon: Lightbulb },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden" aria-label="Toggle sidebar">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="text-lg font-bold text-accent-foreground">F</span>
              </div>
              <span className="text-xl font-bold">FinSage</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">Welcome, {user.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 top-16 z-40 transform border-r border-border bg-white transition-all duration-300 lg:static lg:translate-x-0 ${
            isSidebarExpanded ? "w-64" : "w-20"
          } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-end border-b border-border p-2">
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>

          <nav className="space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-accent text-accent-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={!isSidebarExpanded ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isSidebarExpanded && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 top-16 z-30 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FinSage. All rights reserved.</p>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
