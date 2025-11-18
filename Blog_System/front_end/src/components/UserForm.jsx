import { useState } from "react";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border p-4 rounded-lg shadow-sm flex flex-col gap-3"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="border p-2 rounded-md focus:outline-green-600"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded-md focus:outline-green-600"
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        className="border p-2 rounded-md focus:outline-green-600"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 rounded-md"
      >
        <option>User</option>
        <option>Admin</option>
      </select>

      <button className="bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition">
        Save User
      </button>
    </form>
  );
}
