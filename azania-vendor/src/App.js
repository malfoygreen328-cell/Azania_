import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

// Auth Pages
import Login from "./auth/pages/Login";
import ForgotPassword from "./auth/pages/ForgotPassword";
import ResetPassword from "./auth/pages/ResetPassword";

// Dashboard & Vendor Pages
import Dashboard from "./features/dashboard/pages/Dashboard";
import Products from "./features/products/pages/Products";
import Orders from "./features/orders/pages/Orders";
import Settings from "./features/settings/pages/Settings";
import ProductDashboard from "./features/products/pages/ProductDashboard";

// Vendor & Store Pages
import VendorSignup from "./features/vendorOnboarding/pages/VendorSignup";
import StorePage from "./features/stores/pages/StorePage";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import VendorLayout from "./layouts/VendorLayout";

// Route Protection
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/vendor/signup" element={<VendorSignup />} />
        <Route path="/store/:slug" element={<StorePage />} />

        {/* ---------- MAIN DASHBOARD ---------- */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ---------- VENDOR PANEL ---------- */}
        <Route
          path="/vendor"
          element={<ProtectedRoute><VendorLayout /></ProtectedRoute>}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<div>Analytics Page</div>} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ---------- CATCH ALL ---------- */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;