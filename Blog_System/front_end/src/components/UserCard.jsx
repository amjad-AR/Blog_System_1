export default function UserCard({ user }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-green-700">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500 mt-2">Role: {user.role || "User"}</p>
    </div>
  );
}
