import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  // Check if user is authenticated and has admin privileges
  if (isAuthenticated && user && user.isAdmin) {
    return <Outlet />;
  }
  
  // If authenticated but not admin, redirect to regular dashboard
  if (isAuthenticated && user && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If not authenticated, redirect to admin login
  return <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;