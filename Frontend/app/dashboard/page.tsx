"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useFinance } from "@/lib/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function DashboardPage() {
  const { income, assets, liabilities, creditCards } = useFinance()

  // Calculate totals
  const totalIncome = income.reduce((sum, item) => {
    if (item.frequency === "monthly") return sum + item.amount * 12
    if (item.frequency === "yearly") return sum + item.amount
    return sum + item.amount
  }, 0)

  const totalAssets = assets.reduce((sum, item) => sum + item.value, 0)
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0)
  const totalCreditCardDebt = creditCards.reduce((sum, card) => sum + card.balance, 0)
  const netWorth = totalAssets - totalLiabilities - totalCreditCardDebt

  // Mock data for charts
  const monthlyData = [
    { month: "Jan", income: 5000, expenses: 3500, savings: 1500 },
    { month: "Feb", income: 5200, expenses: 3600, savings: 1600 },
    { month: "Mar", income: 5100, expenses: 3400, savings: 1700 },
    { month: "Apr", income: 5300, expenses: 3700, savings: 1600 },
    { month: "May", income: 5400, expenses: 3800, savings: 1600 },
    { month: "Jun", income: 5500, expenses: 3900, savings: 1600 },
  ]

  const categoryData = [
    { category: "Housing", amount: 1500 },
    { category: "Food", amount: 600 },
    { category: "Transport", amount: 400 },
    { category: "Entertainment", amount: 300 },
    { category: "Utilities", amount: 200 },
    { category: "Other", amount: 500 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your financial health</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Annual income</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAssets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
              <svg className="h-4 w-4 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalLiabilities + totalCreditCardDebt).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Outstanding debt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${netWorth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Assets - Liabilities</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stackId="1"
                    stroke="#EF8354"
                    fill="#EF8354"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="2"
                    stroke="#BFC0C0"
                    fill="#BFC0C0"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="category" className="text-xs" angle={-45} textAnchor="end" height={80} />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="amount" fill="#EF8354" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="/income"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <p className="font-medium">Add Income</p>
                  <p className="text-xs text-muted-foreground">Track new income</p>
                </div>
              </a>

              <a
                href="/assets"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <span className="text-xl">🏦</span>
                </div>
                <div>
                  <p className="font-medium">Add Asset</p>
                  <p className="text-xs text-muted-foreground">Record new asset</p>
                </div>
              </a>

              <a
                href="/liabilities"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <span className="text-xl">📋</span>
                </div>
                <div>
                  <p className="font-medium">Add Liability</p>
                  <p className="text-xs text-muted-foreground">Track new debt</p>
                </div>
              </a>

              <a
                href="/credit-cards"
                className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <p className="font-medium">Add Card</p>
                  <p className="text-xs text-muted-foreground">Add credit card</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
