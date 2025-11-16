import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
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
  }, []); // runs on page load

  return (
    <div className="p-4">
      <Navbar/>
      <h1 className="text-xl font-bold mb-4">
        My Trades
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          onClick={createTrade}
        >
          New Trade
        </button>
      </h1>

      <ul>
        {trades.map((trade) => (
          <li key={trade.id} className="border p-2 mb-2">
            {trade.asset_coin} — Entered: {trade.value_entered}, Outcome: {trade.value_outcome}
          </li>
        ))}
      </ul>
    </div>
  );
}
