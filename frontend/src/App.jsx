import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Journal from "./pages/Journal";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* new */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
