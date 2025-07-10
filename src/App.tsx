import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { blink } from './blink/client'
import Dashboard from './components/Dashboard'
import CustomerManagement from './components/CustomerManagement'
import MembershipTiers from './components/MembershipTiers'
import Offers from './components/Offers'
import Analytics from './components/Analytics'
import BusinessSetup from './components/BusinessSetup'
import BillingPage from './components/BillingPage';
import Sidebar from './components/Sidebar'
import { User } from '@blinkdotnew/sdk'
import CustomerApp from './customer-app/CustomerApp'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCustomerView, setIsCustomerView] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Membership & Rewards Platform</h1>
          <p className="text-xl text-gray-600 mb-8">Create and manage customer memberships with automated rewards</p>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => blink.auth.login()}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Or try the customer experience:</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => window.location.href = '/customer'}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Customer App
                </button>
                <button
                  onClick={() => window.location.href = '/mobile'}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  Mobile Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsCustomerView(!isCustomerView)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isCustomerView ? 'Business View' : 'Customer View'}
        </button>
      </div>
      {isCustomerView ? (
        <CustomerApp />
      ) : (
        <BrowserRouter>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<CustomerManagement />} />
                <Route path="/tiers" element={<MembershipTiers />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/setup" element={<BusinessSetup />} />
                <Route path="/billing" element={<BillingPage />} />
              </Routes>
            </div>
            <Toaster position="top-right" />
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App