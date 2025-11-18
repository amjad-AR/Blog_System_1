import { useState, useEffect } from "react";
import { updateUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed);
        setName(parsed.name || "");
      } catch (e) {
        console.error(e);
      }
    } else {
      // if not logged in, redirect to login
      navigate("/login");
    }
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!user) return;
    setStatus(null);
    try {
      const payload = { name };
      if (password) payload.password = password;
      const res = await updateUser(user._id, payload);
      const updated = res.data || res;
      // sync localStorage
      const newUser = { ...user, ...updated };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      setPassword("");
      setStatus({ ok: true, msg: "Profile updated." });
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message;
      setStatus({ ok: false, msg });
    }
  }

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Profile</h1>

      {status && (
        <div
          className={status.ok ? "text-green-600 mb-3" : "text-red-600 mb-3"}
        >
          {status.msg}
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="bg-white p-4 border rounded-md shadow-sm flex flex-col gap-3"
      >
        <label className="text-sm">Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-md"
        />

        <label className="text-sm">Email</label>
        <input
          value={user.email}
          disabled
          className="border p-2 rounded-md bg-gray-100"
        />

        <label className="text-sm">New Password (leave empty to keep)</label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="border p-2 rounded-md"
        />

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
