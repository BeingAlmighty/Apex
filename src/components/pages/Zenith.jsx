import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import FullSidebar from '../Vector/Sidebar'

const Zenith = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading, user } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="relative h-screen w-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative h-screen w-full bg-gray-50 dark:bg-neutral-900 overflow-hidden">
      {/* Sidebar - Fixed on Left */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <FullSidebar />
      </div>
      
      {/* Main Content Area - Full Width with Flex Layout */}
      <div className="w-full h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Zenith, {user?.full_name || user?.email}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              This is the Zenith page with sidebar integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Zenith
