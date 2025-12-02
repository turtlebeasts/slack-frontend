import { useState } from "react";
import { useNavigate, Link, replace } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { authApi } from "../api";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await authApi.login(email, password);
      localStorage.setItem("token", res.data.token);
      nav("/chat");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      footer={
        <>
          No account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </>
      }
    >
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
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </AuthLayout>
  );
}
