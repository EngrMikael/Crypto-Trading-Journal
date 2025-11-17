export default function TradeItem({ asset, profit }) {
  const isProfit = profit >= 0;

  return (
    <div className="flex items-center justify-between px-6 py-4 
                    rounded-3xl shadow-lg bg-gradient-to-r 
                    from-[#8ecae6] to-[#6aa8c7] 
                    mb-4 w-full max-w-[90%] mx-auto">
      
      {/* Dot */}
      <div className="flex items-center gap-3">
        <span
          className={`w-3 h-3 rounded-full 
            ${isProfit ? "bg-green-400" : "bg-red-500"}`}
        />
        <p className="text-lg font-semibold text-gray-900">{asset}</p>
      </div>

      {/* Profit or Loss */}
      <p className={`text-lg font-bold ${isProfit ? "text-green-600" : "text-red-600"}`}>
        {isProfit ? `+$${profit}` : `-$${Math.abs(profit)}`}
      </p>
    </div>
  );
}
