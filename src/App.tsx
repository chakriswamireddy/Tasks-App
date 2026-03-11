import "antd/dist/reset.css"

import './App.css'
import ProtectedRoute from './routes/ProtectedRoute'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from "./features/auth/pages/LoginPage"
import DashboardPage from "./features/tasks/pages/Dashboard"
import { useAppDispatch } from "./app/hooks"
import { useEffect } from "react"
import { restoreSession } from "./features/auth/authSlice"




function App() {
  
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  return (
    <BrowserRouter>
    
    <Routes>

    <Route path="/" element={<Navigate to='/login' />} />


      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {/* <h1> hello </h1> */}
            <DashboardPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  </BrowserRouter>

  )
}

export default App
