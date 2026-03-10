import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account Created Successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-white p-10 rounded-xl w-[400px]">

        <h2 className="text-3xl font-bold text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

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
            Create Account
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Signup;