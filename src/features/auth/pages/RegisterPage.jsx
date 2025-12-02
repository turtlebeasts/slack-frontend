import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { authApi } from "../api";

export default function RegisterPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await authApi.register(name, email, password);
      localStorage.setItem("token", res.data.token);
      nav("/chat", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Register"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </>
      }
    >
      <input
        className="w-full px-3 py-2.5 rounded-md bg-gray-700 text-white text-sm
                   placeholder:text-gray-400 border border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full px-3 py-2.5 rounded-md bg-gray-700 text-white text-sm
                   placeholder:text-gray-400 border border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full px-3 py-2.5 rounded-md bg-gray-700 text-white text-sm
                   placeholder:text-gray-400 border border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-2.5 rounded-md text-sm font-medium
                   bg-blue-600 hover:bg-blue-500 disabled:hover:bg-blue-600
                   text-white transition-colors"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </AuthLayout>
  );
}
