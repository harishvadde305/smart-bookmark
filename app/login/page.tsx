"use client"

import { supabase } from "@/lib/supabase"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        router.push("/")
      }
    }

    checkUser()
  }, [router])


  // Google Login
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Smart Bookmark App
        </h1>

        <p className="text-gray-500 mb-6">
          Sign in to manage your bookmarks
        </p>


        {/* Google Button */}
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
        >

          {/* Google Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5 bg-white rounded-full p-1"
          >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.35 1.22 8.27 3.21l6.18-6.18C34.64 2.68 29.77 0.5 24 0.5 14.84 0.5 6.95 5.98 3.44 13.94l7.38 5.73C12.69 13.02 17.87 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.55c0-1.66-.15-3.25-.42-4.78H24v9.04h12.44c-.54 2.9-2.18 5.36-4.64 7.01l7.38 5.73C43.66 37.5 46.1 31.58 46.1 24.55z"/>
            <path fill="#FBBC05" d="M10.82 28.67a14.47 14.47 0 0 1 0-9.34l-7.38-5.73A23.95 23.95 0 0 0 0.5 24c0 3.86.93 7.51 2.94 10.4l7.38-5.73z"/>
            <path fill="#34A853" d="M24 47.5c6.48 0 11.92-2.14 15.9-5.83l-7.38-5.73c-2.06 1.38-4.69 2.19-8.52 2.19-6.13 0-11.31-3.52-13.18-8.54l-7.38 5.73C6.95 42.02 14.84 47.5 24 47.5z"/>
          </svg>

          Sign in with Google

        </button>

      </div>

    </div>

  )

}
