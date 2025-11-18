import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Journal() {
  const [trades, setTrades] = useState([]);
  const navigate = useNavigate();

  const createTrade = () => {
    navigate("/register/trade");
  };

  const fetchTrades = async () => {
    try {
      const res = await api.get("/journal");
      setTrades(res.data);
    } catch (err) {
      console.error("Error fetching trades:", err);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[#022437] text-white">
      <Navbar />

      {/* Top Section with Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={createTrade}
          className="mx-auto my-6 px-14 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
        >
          + New Trade
        </button>
      </div>

      {/* Main Glass Container */}
      <div className="mx-auto w-full max-w-3xl bg-[#2e5266]/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="flex justify-between items-center px-6 py-4 rounded-2xl bg-[#7cbcd6]/40 shadow-lg"
            >
              <div className="flex items-center gap-3">
                {/* Profit/Loss Dot */}
                <span
                  className={`w-3 h-3 rounded-full ${
                    trade.value_outcome >= 0 ? "bg-green-400" : "bg-red-500"
                  }`}
                />
                <span className="text-lg font-medium">
                  {trade.asset_coin}
                </span>
              </div>

              {/* Profit/Loss Amount */}
              <span
                className={`text-lg font-semibold ${
                  trade.value_outcome >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {trade.value_outcome >= 0 ? "+" : ""}
                {trade.value_outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// debug the journal page's header, the navbar is not aligned properly unlike dashboard