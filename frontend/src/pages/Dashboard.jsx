import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const navigate = useNavigate();
    
    const goToJournal = () => {
        navigate("/journal");
    }
  return (
    <div className="p-4">
      <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button 
        type="button" 
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={goToJournal} // add click handler
      >
        My Trades
      </button>
    </div>

  );
}
