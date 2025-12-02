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
      nav("/chat");
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
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </>
      }
    >
      <input
        className="w-full p-2 rounded bg-gray-700 text-white"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-gray-700 text-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-gray-700 text-white"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="bg-blue-600 w-full p-2 rounded text-white"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </AuthLayout>
  );
}
