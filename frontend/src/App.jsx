// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Journal from "./pages/Journal";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import RegisterTrade from "./pages/RegisterTrade";
import TradeForm from "./components/TradeForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProfileSettings from "./pages/settings/ProfileSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import ThemeSettings from "./pages/settings/ThemeSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/journal"
            element={
              <ProtectedRoutes>
                <Journal />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          >
            <Route index element={<ProfileSettings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="theme" element={<ThemeSettings />} />
            <Route path="security" element={<SecuritySettings />} />
          </Route>
          <Route
            path="/register/trade"
            element={
              <ProtectedRoutes>
                <TradeForm />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
