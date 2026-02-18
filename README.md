# Smart Bookmark App

## 📌 Project Overview
Smart Bookmark App is a web application that allows users to securely save, view, and manage their personal bookmarks.  
It supports Google authentication and provides real-time updates across multiple tabs without page refresh.

This project demonstrates full-stack development using modern tools and real-time database synchronization.

---

## 🛠️ Tech Stack
- Next.js (App Router)
- TypeScript
- Supabase (Authentication, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)

---

## ✨ Features
- Google OAuth login using Supabase
- Add bookmarks (title + URL)
- Edit bookmarks
- Delete bookmarks
- Private bookmarks per user
- Real-time updates across multiple tabs
- Responsive UI using Tailwind CSS

---

## 🚧 Problems Faced & Solutions

### 1. Real-time data sync across multiple tabs
**Problem:**  
When a bookmark was added in one tab, it did not appear in other tabs automatically.

**Solution:**  
Implemented Supabase realtime subscriptions to listen for database changes and update UI instantly.

---

### 2. Authentication handling
**Problem:**  
Needed secure login without building custom authentication system.

**Solution:**  
Used Supabase Google OAuth for secure and easy authentication.

---

### 3. Next.js App Router structure confusion
**Problem:**  
Initially struggled with proper folder structure and routing.

**Solution:**  
Organized project using `app`, `lib`, and configuration files following Next.js best practices.

---

### 4. Deployment and environment variables
**Problem:**  
Supabase credentials were not available in production.

**Solution:**  
Configured environment variables in Vercel for secure deployment.

---

## 📚 What I Learned
- Real-time application development
- Supabase authentication and database integration
- Next.js App Router structure
- Deployment using Vercel
- Debugging configuration and integration issues

---

## 🚀 Live Demo
(Will be added after Vercel deployment)

---

## 👤 Author
Harish Vadde  
GitHub: https://github.com/harishvadde305
