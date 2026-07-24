import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SuperAdminLayout } from "./super-admin/SuperAdminLayout";
import { Dashboard } from "./super-admin/pages/Dashboard";
import { TrialUsers } from "./super-admin/pages/TrialUsers";
import { Subscriptions } from "./super-admin/pages/Subscriptions";
import { Revenue } from "./super-admin/pages/Revenue";
import { ContactSales } from "./super-admin/pages/ContactSales";
import { Login } from "./super-admin/pages/Login";

import { useAppSelector } from './store/hooks';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><SuperAdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
  
          <Route path="trial-users" element={<TrialUsers />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="contact-sales" element={<ContactSales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
