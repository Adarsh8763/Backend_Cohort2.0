import React from 'react'
import "../features/shared/global.scss"
import { router } from './AppRoutes'
import { RouterProvider } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

const App = () => {
  
  useAuth()

  return (
    <RouterProvider router = {router} />
  )
}

export default App
