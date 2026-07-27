import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SuperAdminLayout } from "./super-admin/SuperAdminLayout";
import { Dashboard } from "./super-admin/pages/Dashboard";
import { TrialUsers } from "./super-admin/pages/TrialUsers";
import { Subscriptions } from "./super-admin/pages/Subscriptions";
import { Revenue } from "./super-admin/pages/Revenue";

import { Login } from "./super-admin/pages/Login";

// Analytics Pages
import { OverviewPage } from "./super-admin/analytics/pages/OverviewPage";
import { LandingPageAnalytics } from "./super-admin/analytics/pages/LandingPageAnalytics";
import { TrafficSourcesPage } from "./super-admin/analytics/pages/TrafficSourcesPage";
import { EventsPage } from "./super-admin/analytics/pages/EventsPage";

import { useAppSelector } from "./store/hooks";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="trial-users" element={<TrialUsers />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="revenue" element={<Revenue />} />


          {/* Analytics Submenu Routes */}
          <Route path="analytics" element={<OverviewPage />} />
          <Route path="analytics/overview" element={<OverviewPage />} />
          <Route path="analytics/landing-page" element={<LandingPageAnalytics />} />
          <Route path="analytics/traffic-sources" element={<TrafficSourcesPage />} />
          <Route path="analytics/events" element={<EventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
