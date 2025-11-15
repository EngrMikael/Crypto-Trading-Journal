import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TradeForm() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    asset_coin: "",
    value_entered: "",
    value_outcome: "",
    date_open: "",
    date_closed: "",
    note: "",
    strategy: "",
    p_l: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post(
        "/register/trade",
        {
          ...form,
          value_entered: parseFloat(form.value_entered),
          value_outcome: parseFloat(form.value_outcome),
          date_open: form.date_open,
          date_closed: form.date_closed || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Trade created successfully ✔");
      navigate("/journal");

    } catch (err) {
      setMessage("Failed to create trade ❌");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="relative">
      {/* CANCEL BUTTON */}
      <button
        type="button"
        className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        onClick={() => navigate("/journal")}
      >
        ✕
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4 text-white"
      >
        <h2 className="text-xl font-bold">Add New Trade</h2>

        <input
          type="text"
          name="asset_coin"
          placeholder="Asset (e.g. BTC)"
          value={form.asset_coin}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <input
          type="number"
          step="0.0001"
          name="value_entered"
          placeholder="Entry Value"
          value={form.value_entered}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <input
          type="number"
          step="0.0001"
          name="value_outcome"
          placeholder="Exit Value"
          value={form.value_outcome}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <label className="block text-sm">Date Open</label>
        <input
          type="date"
          name="date_open"
          value={form.date_open}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <label className="block text-sm">Date Closed (optional)</label>
        <input
          type="date"
          name="date_closed"
          value={form.date_closed}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <textarea
          name="note"
          placeholder="Notes (optional)"
          value={form.note}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <input
          type="text"
          name="strategy"
          placeholder="Strategy (optional)"
          value={form.strategy}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="p_l"
            checked={form.p_l}
            onChange={handleChange}
          />
          <span>Profit?</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
        >
          {loading ? "Saving..." : "Create Trade"}
        </button>

        {message && (
          <p className="text-center mt-2 text-sm text-blue-400">{message}</p>
        )}
      </form>
    </div>
  );
}
