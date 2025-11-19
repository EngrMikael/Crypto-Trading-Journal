import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTrades = async () => {
      try {
        const res = await api.get("/journal", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrades(res.data);
      } catch (err) {
        console.error("Error fetching trades:", err);
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, [token, navigate]);

  // Dashboard stats calculated locally
  const totalTrades = trades.length;
  const totalProfit = trades
    .filter((t) => t.value_outcome > 0)
    .reduce((sum, t) => sum + t.value_outcome, 0);
  const totalLoss = trades
    .filter((t) => t.value_outcome < 0)
    .reduce((sum, t) => sum + t.value_outcome, 0);

  const goToJournal = () => navigate("/journal");

  if (!token) return null; // prevent rendering without token
  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-[#022437] text-white">
      <Navbar />

      {/* Main Container */}
      <div className="mx-auto max-w-4xl bg-[#2e5266]/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl mt-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="mb-6 text-lg">
          Welcome to your dashboard! Here you can manage your trades and track your performance.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={goToJournal}
            className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-semibold shadow-lg transition"
          >
            My Trades
          </button>

          <button
            onClick={() => alert("Another feature coming soon!")}
            className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-500 rounded-2xl text-white font-semibold shadow-lg transition"
          >
            Analytics
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#7cbcd6]/40 backdrop-blur-xl p-4 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Trades</h2>
            <p className="text-2xl font-bold">{totalTrades}</p>
          </div>
          <div className="bg-[#7cbcd6]/40 backdrop-blur-xl p-4 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Profit</h2>
            <p className="text-2xl font-bold text-green-400">
              + {totalProfit.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#7cbcd6]/40 backdrop-blur-xl p-4 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Loss</h2>
            <p className="text-2xl font-bold text-red-400">
              {totalLoss.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
