import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login Successful");
      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-white p-10 rounded-xl w-[400px]">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            className="w-full bg-black text-white py-3 rounded"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;