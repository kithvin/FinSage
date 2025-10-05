"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useFinance } from "@/lib/finance-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function IncomePage() {
  const { income, addIncome, deleteIncome } = useFinance()
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState("")
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState<"monthly" | "yearly" | "one-time">("monthly")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addIncome({
      source,
      amount: Number.parseFloat(amount),
      frequency,
      date: new Date().toISOString(),
    })
    setSource("")
    setAmount("")
    setFrequency("monthly")
    setIsOpen(false)
  }

  const totalAnnualIncome = income.reduce((sum, item) => {
    if (item.frequency === "monthly") return sum + item.amount * 12
    if (item.frequency === "yearly") return sum + item.amount
    return sum + item.amount
  }, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Income</h1>
            <p className="text-muted-foreground">Track and manage your income sources</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Add Income</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
                <DialogDescription>Add a new income source to track your earnings</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Income Source</Label>
                  <Input
                    id="source"
                    placeholder="e.g., Salary, Freelance, Investment"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="one-time">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Add Income
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Total Annual Income</CardTitle>
            <CardDescription>Estimated yearly income from all sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-accent">${totalAnnualIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
            <CardDescription>All your tracked income sources</CardDescription>
          </CardHeader>
          <CardContent>
            {income.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>No income sources added yet.</p>
                <p className="text-sm">Click "Add Income" to get started.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Annual Value</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {income.map((item) => {
                    const annualValue =
                      item.frequency === "monthly"
                        ? item.amount * 12
                        : item.frequency === "yearly"
                          ? item.amount
                          : item.amount
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.source}</TableCell>
                        <TableCell>${item.amount.toLocaleString()}</TableCell>
                        <TableCell className="capitalize">{item.frequency}</TableCell>
                        <TableCell>${annualValue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="destructive" size="sm" onClick={() => deleteIncome(item.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
