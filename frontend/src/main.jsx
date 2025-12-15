import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // <-- import your AuthContext

const theme = localStorage.getItem("theme") || "dark";
document.documentElement.classList.toggle("dark", theme === "dark");

const accent = localStorage.getItem("accent") || "cyan";
document.documentElement.dataset.accent = accent;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap your App */}
      <App />
    </AuthProvider>
  </StrictMode>,
);
