// Settings.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import ProfileSettings from "./settings/ProfileSettings";
import AccountSettings from "./settings/AccountSettings";
import ThemeSettings from "./settings/ThemeSettings";
import SecuritySettings from "./settings/SecuritySettings";

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-900 to-cyan-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 flex gap-6">
        
        {/* LEFT SIDEBAR */}
        <div className="
          w-64 p-6 rounded-3xl 
          bg-white/10 backdrop-blur-xl 
          shadow-lg border border-white/20
          flex flex-col gap-4
        ">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>

          <NavLink
            to="/settings/profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition-all ${
                isActive ? "bg-white/30" : "hover:bg-white/10"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/settings/account"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition-all ${
                isActive ? "bg-white/30" : "hover:bg-white/10"
              }`
            }
          >
            Account
          </NavLink>

          <NavLink
            to="/settings/theme"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition-all ${
                isActive ? "bg-white/30" : "hover:bg-white/10"
              }`
            }
          >
            Theme
          </NavLink>

          <NavLink
            to="/settings/security"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition-all ${
                isActive ? "bg-white/30" : "hover:bg-white/10"
              }`
            }
          >
            Security
          </NavLink>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="mt-8 px-4 py-2 rounded-xl bg-red-500/40 hover:bg-red-500/60 transition-all"
          >
            Sign Out
          </button>
        </div>

        {/* RIGHT CONTENT PANEL */}
        <div className="
          flex-1 p-8 rounded-3xl 
          bg-white/10 backdrop-blur-xl 
          shadow-lg border border-white/20
        ">
          <Outlet /> {/* Renders the active settings page */}
        </div>
      </div>
    </div>
  );


}





// i still need to redesign for a proper glasmorphic design
// this will be the task for the next days