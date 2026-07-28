import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SuperAdminLayout } from "./layout/view/SuperAdminLayout";
import { Dashboard } from "./modules/dashboard/view/Dashboard";
import { TrialUsers } from "./modules/trial-users/view/TrialUsers";
import { Subscriptions } from "./modules/subscriptions/view/Subscriptions";
import { Revenue } from "./modules/revenue/view/Revenue";
import { Login } from "./modules/auth/view/Login";

// Domain Module Views
import { OverviewPage } from "./modules/overview/view/OverviewPage";
import { LandingPageAnalytics } from "./modules/landing/view/LandingPageAnalytics";
import { TrafficSourcesPage } from "./modules/traffic/view/TrafficSourcesPage";
import { EventsPage } from "./modules/events/view/EventsPage";

import type { ReactNode } from "react";
import { useAppSelector } from "./store/hooks";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
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
          <Route
            path="analytics/landing-page"
            element={<LandingPageAnalytics />}
          />
          <Route
            path="analytics/traffic-sources"
            element={<TrafficSourcesPage />}
          />
          <Route path="analytics/events" element={<EventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
