import React from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes'
import "./App.css"

const App = () => {
  return (
    <>
      <RouterProvider router={AppRoutes} />
    </>
  )
}

export default App
