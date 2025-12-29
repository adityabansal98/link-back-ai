"use client"

import { LogOut, User, Settings } from "lucide-react"
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { trackButtonClick } from "@/lib/analytics"

/**
 * Header component with authentication UI
 * Displays user info and sign in/out buttons
 */
export function Header() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="container mx-auto px-4 pt-6">
      <div className="flex justify-end">
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              {user?.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm">{user?.fullName || user?.emailAddresses[0]?.emailAddress}</span>
            </div>
            <Link
              href="/profile"
              onClick={() => trackButtonClick("profile_link", "header")}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-slate-100 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <SignOutButton>
              <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-slate-100 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  )
}

