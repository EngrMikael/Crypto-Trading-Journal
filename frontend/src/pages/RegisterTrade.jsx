import TradeForm from "../components/TradeForm";

export default function RegisterTrade() {
  const handleTradeAdded = () => {
    console.log("Trade added!");
  };

  return (
    <div className="p-4">
      <TradeForm onTradeAdded={handleTradeAdded} />
    </div>
  );
}
