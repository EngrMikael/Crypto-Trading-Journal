import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("Logged in");
            navigate("/dashboard")
        } catch (err) {
            alert("Login Failed: " + err.respone?.data?.detail || err.message)
        }
        
    };

return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Login
            </button>
        </form>
    );
}