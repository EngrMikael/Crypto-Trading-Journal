import TradeItem from "./TradeItem";

export default function TradeList({ trades }) {
  return (
    <div className="mx-auto mt-10 p-6 rounded-3xl 
                    bg-[#2b4c63] shadow-2xl 
                    w-[90%] max-w-2xl h-[450px]
                    overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
      
      {trades.map((trade) => (
        <TradeItem
          key={trade.id}
          asset={`USDT-${trade.asset_coin}`}
          valueEntered={trade.value_entered}
          valueOutcome={trade.value_outcome}
        />
      ))}
    </div>
  );
}
