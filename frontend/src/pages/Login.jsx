import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        } finally {
            setLoading(false);
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="mx-auto max-w-xl aspect-[1/1] bg-[#2e5266]/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl mt-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                <h1 className="text-4xl text-center font-bold mb-4">Login</h1>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 my-3 w-full rounded-xl text-black"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 my-3 w-full rounded-xl text-black"
                />

                {/* Centered Login Button */}
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 rounded-xl text-white px-6 py-2"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>

                {/* Right-Aligned Register Button */}
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        className="text-blue-500 underline"
                        onClick={goToRegister}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
