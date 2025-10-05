"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useFinance } from "@/lib/finance-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function CreditCardsPage() {
  const { creditCards, addCreditCard, deleteCreditCard } = useFinance()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [limit, setLimit] = useState("")
  const [balance, setBalance] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [apr, setApr] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addCreditCard({
      name,
      limit: Number.parseFloat(limit),
      balance: Number.parseFloat(balance),
      dueDate,
      apr: Number.parseFloat(apr),
    })
    setName("")
    setLimit("")
    setBalance("")
    setDueDate("")
    setApr("")
    setIsOpen(false)
  }

  const totalBalance = creditCards.reduce((sum, card) => sum + card.balance, 0)
  const totalLimit = creditCards.reduce((sum, card) => sum + card.limit, 0)
  const utilizationRate = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Credit Cards</h1>
            <p className="text-muted-foreground">Track and manage your credit cards</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Add Credit Card</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Credit Card</DialogTitle>
                <DialogDescription>Add a credit card to track spending and payments</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Card Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Chase Sapphire, Amex Gold"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Credit Limit ($)</Label>
                  <Input
                    id="limit"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Current Balance ($)</Label>
                  <Input
                    id="balance"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apr">APR (%)</Label>
                  <Input
                    id="apr"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={apr}
                    onChange={(e) => setApr(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Payment Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Add Credit Card
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Balance</CardTitle>
              <CardDescription>Combined balance across all cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">${totalBalance.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Credit Limit</CardTitle>
              <CardDescription>Combined limit across all cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalLimit.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Utilization</CardTitle>
              <CardDescription>Percentage of credit used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{utilizationRate.toFixed(1)}%</div>
              <Progress value={utilizationRate} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">Keep below 30% for optimal credit score</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Credit Cards</CardTitle>
            <CardDescription>All your tracked credit cards</CardDescription>
          </CardHeader>
          <CardContent>
            {creditCards.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>No credit cards added yet.</p>
                <p className="text-sm">Click "Add Credit Card" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {creditCards.map((card) => {
                  const utilization = (card.balance / card.limit) * 100
                  return (
                    <Card key={card.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{card.name}</CardTitle>
                          <Button variant="destructive" size="sm" onClick={() => deleteCreditCard(card.id)}>
                            Delete
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Balance</p>
                            <p className="text-2xl font-bold">${card.balance.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Credit Limit</p>
                            <p className="text-2xl font-bold">${card.limit.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">APR</p>
                            <p className="text-xl font-semibold">{card.apr}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Due Date</p>
                            <p className="text-xl font-semibold">{new Date(card.dueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Utilization</span>
                            <span className="font-semibold">{utilization.toFixed(1)}%</span>
                          </div>
                          <Progress value={utilization} />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
