import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="
          flex gap-8 px-10 py-3 
          rounded-full 
          bg-gradient-to-br from-cyan-900/60 to-teal-700/40 
          backdrop-blur-xl shadow-[inset_0_0_15px_rgba(255,255,255,0.3)]
      ">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full text-sm transition-all duration-300 ${
              isActive
                ? "bg-white text-black shadow-md"
                : "text-white/80 hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/journal"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full text-sm transition-all duration-300 ${
              isActive
                ? "bg-white text-black shadow-md"
                : "text-white/80 hover:text-white"
            }`
          }
        >
          Journal
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full text-sm transition-all duration-300 ${
              isActive
                ? "bg-white text-black shadow-md"
                : "text-white/80 hover:text-white"
            }`
          }
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
}
