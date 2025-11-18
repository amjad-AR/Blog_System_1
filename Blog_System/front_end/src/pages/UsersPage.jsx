import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import { useState, useEffect } from "react";
import { getUsers, createUser } from "../api/userApi";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsers();
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    }

    fetchUsers();
  }, []);

  async function addUser(newUser) {
    try {
      const res = await createUser(newUser);
      const created = res.data?.user || res.data || newUser;
      setUsers([...users, created]);
    } catch (err) {
      console.error("Failed to create user:", err);
      setUsers([...users, newUser]);
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserForm onSubmit={addUser} />
        </div>

        <div className="md:col-span-2 grid gap-4">
          {users.length === 0 ? (
            <p className="text-gray-500">No users yet…</p>
          ) : (
            users.map((user, idx) => <UserCard key={idx} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
}
