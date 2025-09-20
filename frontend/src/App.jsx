import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardRoutes from './routes/dashboardRoutes'; 
import TaskRoutes from './routes/taskRoutes'; 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthThunk } from './features/authSlice'; 

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuthThunk());
  },[dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        
        <Route path="/tasks/*" element={<TaskRoutes />} /> 
      </Routes>
    </Router>
  );
}

export default App;