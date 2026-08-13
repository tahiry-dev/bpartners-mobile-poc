# 🚀 Bpartners — POC & Mobile Showcase App

> **Important Note:** This project is a **minimalist Proof of Concept (POC)** serving as a **visual showcase and reflection** of a previous mobile application. It is designed to demonstrate key business logic, user experience (UX), and core features within a realistic mobile container preview. **It does not include database persistence** (data is managed in-memory via Redux).

---

## 📱 Module Overview

The application features two primary modules accessible via the bottom tab navigation:

### 1. 📊 Cashflow & Invoicing (Module 1)
* **Dynamic Cashflow Chart:** Real-time calculation of collected vs. pending revenue forecast.
* **Installment Invoicing:** Automated payment schedule breakdown (30% upfront / 70% due at +30 days).
* **Collapsible Manual Creation:** Clean form interface for manual invoice creation.
* **Direct Vector PDF Export:** Instant rendering and downloading of official PDF invoices using `@react-pdf/renderer` (bypassing print dialogs).
* **Offline-First Sync Status:** Visual indicators simulating background sync status (`SYNCED` / `PENDING`).

### 2. 🎯 AI Lead Matcher (Module 2)
* **Contractor Matchmaking:** Smart lead selection tailored by trade, geographical location, and minimum budget filters.
* **AI Scoring & Strategy:** Match percentage score calculation alongside strategic advice for client approach.
* **Lead Details View:** Mobile-confined modal for full lead details with direct lead-to-lead navigation controls (`◄ Prev` / `Next ►`).
* **1-Click Cashflow Conversion:** Instantly convert accepted leads into upfront invoices synchronized with the Cashflow module.

---

## 🛠️ Tech Stack

* **Framework:** React Native / React Native for Web
* **State Management:** Redux Toolkit
* **PDF Engine:** `@react-pdf/renderer`
* **UI & Layout:** Full-width tab bar, header navigation, and custom mobile device frame mockup.

---

## 🚀 Local Setup & Installation

Follow these steps to run the application locally on your machine:

### 1. Prerequisites
Ensure you have **Node.js** (v16 or higher) and **npm** installed on your system.

### 2. Clone the Repository
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_DIRECTORY>

### 3. Install Dependencies
npm install

### 4. Start the Application
npm run web
# or
npx expo start --web

### 5. Access the Web App
Once the bundle is built, open your browser and navigate to:
http://localhost:8081
*(If port 8081 is in use, Expo will display the assigned local port in your terminal).*

---

## 📌 Note on Data Persistence

This application is designed as an **ephemeral showcase**:
* Invoices and leads are managed in the **Redux Store (In-Memory)**.
* Refreshing the browser page resets the application state to default demo data.
* *Future Roadmap: Integration with REST APIs, Supabase, Firebase, or persistent local storage (`AsyncStorage`) can be added in subsequent iterations.*
