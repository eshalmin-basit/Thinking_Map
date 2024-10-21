import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

// Font configuration
const montserrat = Montserrat({ subsets: ['latin'] })

// Metadata configuration
export const metadata: Metadata = {
  title: 'Intellithink: AI-Powered Problem Structuring',
  description: 'Enhance your problem-solving skills with AI-powered thinking methodologies',
}

// Main RootLayout function
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          {/* Header or Navigation Bar */}
          <header className="p-4 bg-gray-800 text-white">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-[#ED3A79]">Intelli</span>
                <span className="text-[#ED3A79]">Think</span>
              </h1>
              <nav>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="container mx-auto mt-8 bg-white">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-8 p-4 bg-gray-800 text-white text-center">
            <p>&copy;  Intellithink@igebra. All rights reserved.</p>
          </footer>

          {/* Vercel Analytics */}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}