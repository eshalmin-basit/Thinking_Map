'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import AIThinkingAssistant from '@/components/AIThinkingAssistant'

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen">
      <AIThinkingAssistant />
    </div>
  )
}