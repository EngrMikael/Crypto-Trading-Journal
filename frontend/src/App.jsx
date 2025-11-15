import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Journal from "./pages/Journal";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register"
import RegisterTrade from "./pages/RegisterTrade";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/register/trade" element={<RegisterTrade />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* new */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
