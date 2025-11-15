import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Register(){
    const {register} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        try {
            await register(email, password);
            alert("User Registered");
            navigate("/login");
        // "Register Failed: " + err.response?.data?.detail || err.message 
        // this is the earlier catch, where it neglects err.message, 
        // since there is a precedence on the part closest to +
        // therefore, it never run || err.message
        } catch (err) {
            const msg =
                err.response?.data?.detail ||
                err.response?.data?.message ||
                err.message ||
                "Registration failed";

            alert("Register Failed: " + msg);
        }
    };


return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Register</h1>
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
                        <input
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Register
            </button>
            <button
                type="button"
                className="text-blue-500 underline mt-2"
                onClick={goToLogin}
            >
                Login
            </button>
        </form>
    );
}