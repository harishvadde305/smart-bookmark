"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type Bookmark = {
  id: string
  title: string
  url: string
  user_id: string
  created_at: string
}

export default function Home() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState("")
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)


  // CHECK USER LOGIN
  useEffect(() => {

    const checkUser = async () => {

      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/login")
      } else {
        setUserId(data.user.id)
        fetchBookmarks(data.user.id)
      }

    }

    checkUser()

  }, [router])



  // REALTIME SUBSCRIPTION
  useEffect(() => {

    if (!userId) return

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchBookmarks(userId)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [userId])



  // FETCH BOOKMARKS
  const fetchBookmarks = async (uid: string) => {

    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })

    setBookmarks(data || [])

  }



  // SAVE OR UPDATE
  const saveBookmark = async () => {

    if (!userId) return

    if (!title || !url) {
      setMessage("Enter title and URL")
      return
    }

    if (editingId) {

      await supabase
        .from("bookmarks")
        .update({
          title,
          url
        })
        .eq("id", editingId)

      setMessage("Bookmark updated")
      setEditingId(null)

    } else {

      await supabase
        .from("bookmarks")
        .insert([
          {
            title,
            url,
            user_id: userId
          }
        ])

      setMessage("Bookmark saved")

    }

    setTitle("")
    setUrl("")

  }



  // DELETE
  const deleteBookmark = async (id: string) => {

    await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)

  }



  // EDIT CLICK
  const editBookmark = (bookmark: Bookmark) => {

    setTitle(bookmark.title)
    setUrl(bookmark.url)
    setEditingId(bookmark.id)

  }



  // LOGOUT
  const logout = async () => {

    await supabase.auth.signOut()
    router.push("/login")

  }



  // UI
  return (

    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">

      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold text-gray-800">
            Smart Bookmark App
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>



        {/* INPUT */}

        <input
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        <button
          onClick={saveBookmark}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg mb-4"
        >
          {editingId ? "Update Bookmark" : "Save Bookmark"}
        </button>



        {message && (
          <p className="text-green-600 mb-4">
            {message}
          </p>
        )}



        {/* LIST */}

        <h2 className="text-lg font-semibold mb-3">
          Saved Bookmarks
        </h2>


        <div className="space-y-3">

          {bookmarks.map((bookmark) => (

            <div
              key={bookmark.id}
              className="border p-3 rounded-lg bg-gray-50 flex justify-between items-center"
            >

              <div>

                <div className="font-semibold text-gray-800">
                  {bookmark.title}
                </div>

                <a
                  href={bookmark.url}
                  target="_blank"
                  className="text-blue-500 hover:underline text-sm"
                >
                  {bookmark.url}
                </a>

              </div>


              <div className="space-x-2">

                <button
                  onClick={() => editBookmark(bookmark)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>


                <button
                  onClick={() => deleteBookmark(bookmark.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
