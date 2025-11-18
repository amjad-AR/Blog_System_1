import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, createUser } from "../api/userApi";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await loginUser(form);
      const user = res.data;
      // store user in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/");
    } catch (err) {
      // if login failed because user doesn't exist, attempt to create user
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err.message;
      if (status === 404 || /not found|no user/i.test(msg)) {
        try {
          // create a minimal user record using email as name and default role
          const nameFromEmail = form.email.split("@")[0] || form.email;
          const newUserPayload = {
            name: nameFromEmail,
            email: form.email,
            password: form.password,
            role: "User",
          };
          const createRes = await createUser(newUserPayload);
          const created =
            createRes.data?.user || createRes.data || newUserPayload;
          localStorage.setItem("user", JSON.stringify(created));
          // Dispatch custom event to notify Navbar
          window.dispatchEvent(new Event("userUpdated"));
          navigate("/");
          return;
        } catch (createErr) {
          const createMsg =
            createErr?.response?.data?.message || createErr.message;
          setError(createMsg);
          return;
        }
      }

      setError(msg);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-sm">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Login</h1>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded-md"
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="border p-2 rounded-md"
        />

        <button className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  );
}
