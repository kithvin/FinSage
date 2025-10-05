"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("finsage_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Get existing users
      const usersData = localStorage.getItem("finsage_users")
      const users = usersData ? JSON.parse(usersData) : []

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In production, this should be hashed
        name,
      }

      users.push(newUser)
      localStorage.setItem("finsage_users", JSON.stringify(users))

      // Log the user in
      const userWithoutPassword = { id: newUser.id, email: newUser.email, name: newUser.name }
      setUser(userWithoutPassword)
      localStorage.setItem("finsage_user", JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersData = localStorage.getItem("finsage_users")
      const users = usersData ? JSON.parse(usersData) : []

      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userWithoutPassword = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
        setUser(userWithoutPassword)
        localStorage.setItem("finsage_user", JSON.stringify(userWithoutPassword))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("finsage_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
