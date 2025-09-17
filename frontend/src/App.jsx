import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import React from 'react'
import { Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
