import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";

const DashboardRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  // Redirect admin users to admin dashboard
  if (user && user.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <ProtectedRoute>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default DashboardRoutes;