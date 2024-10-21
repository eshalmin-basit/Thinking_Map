'use client'

import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="signup-container bg-white p-8 rounded-lg shadow-xl">
        <SignIn 
          afterSignInUrl="/dashboard"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}