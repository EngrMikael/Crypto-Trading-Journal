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
    };

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
        <div className="mx-auto max-w-xl aspect-[1/1] bg-[#2e5266]/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl mt-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                <h1 className="text-4xl text-center font-bold mb-4">Register</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-2 w-full text-black rounded-xl my-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-2 w-full text-black rounded-xl my-3"
                />

                <input
                    type="password"
                    placeholder="Re-Enter Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 mb-2 w-full text-black rounded-xl my-3"
                />

                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-xl"
                    >
                        Register
                    </button>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        className="text-blue-500 underline"
                        onClick={goToLogin}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}



// i still need to redesign for a proper glasmorphic design