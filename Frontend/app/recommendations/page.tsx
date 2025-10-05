"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useFinance } from "@/lib/finance-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RecommendationsPage() {
  const { recommendations, updateRecommendationStatus } = useFinance()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "medium":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const pendingCount = recommendations.filter((r) => r.status === "pending").length
  const inProgressCount = recommendations.filter((r) => r.status === "in-progress").length
  const completedCount = recommendations.filter((r) => r.status === "completed").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recommendations</h1>
          <p className="text-muted-foreground">AI-powered insights to improve your financial health</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Recommendations to review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inProgressCount}</div>
              <p className="text-xs text-muted-foreground">Currently working on</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">Successfully implemented</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {recommendations.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <p>No recommendations available yet.</p>
                <p className="text-sm">Add your financial data to receive personalized recommendations.</p>
              </CardContent>
            </Card>
          ) : (
            recommendations.map((recommendation) => (
              <Card key={recommendation.id}>
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <CardTitle className="text-xl">{recommendation.title}</CardTitle>
                        <Badge className={getPriorityColor(recommendation.priority)}>
                          {recommendation.priority} priority
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{recommendation.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 sm:items-end">
                      <Badge className={getStatusColor(recommendation.status)}>
                        {recommendation.status === "in-progress" ? "In Progress" : recommendation.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(recommendation.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Update Status</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Select
                        value={recommendation.status}
                        onValueChange={(value: any) => updateRecommendationStatus(recommendation.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Card */}
        <Card className="border-accent/50 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              How Recommendations Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              FinSage analyzes your financial data to provide personalized recommendations that can help improve your
              financial health.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Track your progress by updating recommendation statuses</li>
              <li>Focus on high-priority items first for maximum impact</li>
              <li>New recommendations appear as you add more financial data</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
