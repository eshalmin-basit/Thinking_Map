'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { useUser } from '@clerk/nextjs'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white ${montserrat.className}`}>
      <header className="p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-blue-400">Intelli</span>
          <span className="text-purple-400">Think</span>
        </div>
        <nav>
          <Link href="/sign-up" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2">
            Sign Up
          </Link>
          <Link href="/sign-in" className="bg-transparent hover:bg-purple-700 text-white font-bold py-2 px-4 rounded border border-purple-500 hover:border-transparent">
            Sign In
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
          Welcome to <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Intellithink: AI-Powered Problem Structuring and Visualization
          </span>
        </h1>
        <div>
          <Link href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg mr-4">
            Get Started
          </Link>
          <Link href="/sign-up" className="bg-transparent hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg border border-purple-500 hover:border-transparent">
            Sign Up
          </Link>
        </div>
      </main>

      <footer className="p-4 text-center text-sm">
        Intellithink@igebra.ai
      </footer>
    </div>
  )
}