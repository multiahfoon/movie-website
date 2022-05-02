import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export function AuthProvider({ children }: AuthProviderProps) {
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const router = useRouter()

  const memoedValue = useMemo(
    () => ({
      error,
      loading,
      logout,
      signIn,
      signUp,
      user,
    }),
    [loading, user]
  )

  // checks if the use is logged in if browser refresh / remount or if auth changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged in...
        setUser(user)
        setLoading(false)
      } else {
        // Not logged in...
        setUser(null)
        setLoading(true)
        router.push('/login')
      }

      setInitialLoading(false)
    })
  }, [auth])

  async function signUp(email: string, password: string) {
    setLoading(true)

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    if (userCredential?.user) {
      setUser(userCredential.user)
      router.push('/')
      setLoading(false)
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true)

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    if (userCredential?.user) {
      setUser(userCredential.user)
      router.push('/')
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)

    await signOut(auth)

    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
