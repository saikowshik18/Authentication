import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg">
          Send Reset Link
        </button>
      </form>
    </AuthLayout>
  );
}
