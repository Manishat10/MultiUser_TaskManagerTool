import { Route, Routes, Navigate } from "react-router-dom"; 
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute"; 

const DashboardRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route index element={<DashboardPage />} />
    </Route>
  </Routes>
);

export default DashboardRoutes;