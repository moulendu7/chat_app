import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Auth({ modeProp = "login" }) {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [mode, setMode] = useState(modeProp);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url =
      mode === "login"
        ? `${API_URL}/login`
        : `${API_URL}/signup`;

    const body =
      mode === "login"
        ? { email: form.email, password: form.password }
        : form;

    try {
      const res = await axios.post(url, body);

      if (mode === "login") {
        const { token, user } = res.data;
        loginUser(token, user);
        navigate("/dashboard");
      } else {
        setMode("login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setPos({ x, y });
      }}
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `radial-gradient(
          circle at ${pos.x}% ${pos.y}%,
          rgba(59,130,246,0.35),
          #020617 60%
        )`
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl
                   p-8 rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-xl text-center">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            className="w-full mb-4 p-3 rounded-xl
                       bg-white/20 outline-none"
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="w-full mb-4 p-3 rounded-xl
                     bg-white/20 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full mb-6 p-3 rounded-xl
                     bg-white/20 outline-none"
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl
                     bg-blue-600 hover:bg-blue-700
                     transition font-semibold"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>

        <p className="text-center mt-6 text-gray-300 text-sm">
          {mode === "login" ? "No account?" : "Already have one?"}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="ml-2 text-blue-400 hover:underline"
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
