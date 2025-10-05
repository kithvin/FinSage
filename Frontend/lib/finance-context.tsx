"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface IncomeItem {
  id: string
  source: string
  amount: number
  frequency: "monthly" | "yearly" | "one-time"
  date: string
}

export interface AssetItem {
  id: string
  name: string
  type: string
  value: number
  date: string
}

export interface LiabilityItem {
  id: string
  name: string
  type: string
  amount: number
  interestRate: number
  dueDate: string
}

export interface CreditCardItem {
  id: string
  name: string
  limit: number
  balance: number
  dueDate: string
  apr: number
}

export interface Recommendation {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "high" | "medium" | "low"
  date: string
}

interface FinanceContextType {
  income: IncomeItem[]
  assets: AssetItem[]
  liabilities: LiabilityItem[]
  creditCards: CreditCardItem[]
  recommendations: Recommendation[]
  addIncome: (item: Omit<IncomeItem, "id">) => void
  addAsset: (item: Omit<AssetItem, "id">) => void
  addLiability: (item: Omit<LiabilityItem, "id">) => void
  addCreditCard: (item: Omit<CreditCardItem, "id">) => void
  updateRecommendationStatus: (id: string, status: Recommendation["status"]) => void
  deleteIncome: (id: string) => void
  deleteAsset: (id: string) => void
  deleteLiability: (id: string) => void
  deleteCreditCard: (id: string) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [income, setIncome] = useState<IncomeItem[]>([])
  const [assets, setAssets] = useState<AssetItem[]>([])
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([])
  const [creditCards, setCreditCards] = useState<CreditCardItem[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedIncome = localStorage.getItem("finsage_income")
    const storedAssets = localStorage.getItem("finsage_assets")
    const storedLiabilities = localStorage.getItem("finsage_liabilities")
    const storedCreditCards = localStorage.getItem("finsage_credit_cards")
    const storedRecommendations = localStorage.getItem("finsage_recommendations")

    if (storedIncome) setIncome(JSON.parse(storedIncome))
    if (storedAssets) setAssets(JSON.parse(storedAssets))
    if (storedLiabilities) setLiabilities(JSON.parse(storedLiabilities))
    if (storedCreditCards) setCreditCards(JSON.parse(storedCreditCards))
    if (storedRecommendations) setRecommendations(JSON.parse(storedRecommendations))
    else {
      // Set default recommendations if none exist
      const defaultRecommendations: Recommendation[] = [
        {
          id: "1",
          title: "Build Emergency Fund",
          description: "Aim to save 3-6 months of expenses in a high-yield savings account",
          status: "pending",
          priority: "high",
          date: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Review Credit Card APR",
          description: "Consider balance transfer to lower APR card to save on interest",
          status: "pending",
          priority: "medium",
          date: new Date().toISOString(),
        },
      ]
      setRecommendations(defaultRecommendations)
      localStorage.setItem("finsage_recommendations", JSON.stringify(defaultRecommendations))
    }
  }, [])

  const addIncome = (item: Omit<IncomeItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() }
    const updated = [...income, newItem]
    setIncome(updated)
    localStorage.setItem("finsage_income", JSON.stringify(updated))
  }

  const addAsset = (item: Omit<AssetItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() }
    const updated = [...assets, newItem]
    setAssets(updated)
    localStorage.setItem("finsage_assets", JSON.stringify(updated))
  }

  const addLiability = (item: Omit<LiabilityItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() }
    const updated = [...liabilities, newItem]
    setLiabilities(updated)
    localStorage.setItem("finsage_liabilities", JSON.stringify(updated))
  }

  const addCreditCard = (item: Omit<CreditCardItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() }
    const updated = [...creditCards, newItem]
    setCreditCards(updated)
    localStorage.setItem("finsage_credit_cards", JSON.stringify(updated))
  }

  const updateRecommendationStatus = (id: string, status: Recommendation["status"]) => {
    const updated = recommendations.map((rec) => (rec.id === id ? { ...rec, status } : rec))
    setRecommendations(updated)
    localStorage.setItem("finsage_recommendations", JSON.stringify(updated))
  }

  const deleteIncome = (id: string) => {
    const updated = income.filter((item) => item.id !== id)
    setIncome(updated)
    localStorage.setItem("finsage_income", JSON.stringify(updated))
  }

  const deleteAsset = (id: string) => {
    const updated = assets.filter((item) => item.id !== id)
    setAssets(updated)
    localStorage.setItem("finsage_assets", JSON.stringify(updated))
  }

  const deleteLiability = (id: string) => {
    const updated = liabilities.filter((item) => item.id !== id)
    setLiabilities(updated)
    localStorage.setItem("finsage_liabilities", JSON.stringify(updated))
  }

  const deleteCreditCard = (id: string) => {
    const updated = creditCards.filter((item) => item.id !== id)
    setCreditCards(updated)
    localStorage.setItem("finsage_credit_cards", JSON.stringify(updated))
  }

  return (
    <FinanceContext.Provider
      value={{
        income,
        assets,
        liabilities,
        creditCards,
        recommendations,
        addIncome,
        addAsset,
        addLiability,
        addCreditCard,
        updateRecommendationStatus,
        deleteIncome,
        deleteAsset,
        deleteLiability,
        deleteCreditCard,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}
