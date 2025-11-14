import { useEffect, useState } from "react";
import api from "../api/api";

export default function Journal() {
    const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const res = await api.get("/journal");
      setTrades(res.data);
    };
    fetchTrades();
  }, []);

    return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Trades</h1>
      <ul>
        {trades.map(trade => (
          <li key={trade.id} className="border p-2 mb-2">
            {trade.asset_coin} — Entered: {trade.value_entered}, Outcome: {trade.value_outcome}
          </li>
        ))}
      </ul>
    </div>
  );
}