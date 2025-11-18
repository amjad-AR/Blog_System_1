import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    // Listen for custom event when user is updated (login/logout)
    function handleUserUpdated() {
      const updated = localStorage.getItem("user");
      if (updated) {
        try {
          setUser(JSON.parse(updated));
        } catch (e) {
          console.error("Failed to parse updated user from localStorage", e);
        }
      } else {
        setUser(null);
      }
    }

    // Listen for storage changes (when user logs in/out in another tab)
    function handleStorageChange(event) {
      if (event.key === "user") {
        if (event.newValue) {
          try {
            setUser(JSON.parse(event.newValue));
          } catch (e) {
            console.error("Failed to parse updated user from localStorage", e);
          }
        } else {
          setUser(null);
        }
      }
    }

    window.addEventListener("userUpdated", handleUserUpdated);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("userUpdated", handleUserUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className="bg-green-700 text-white py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <Link
          to="/"
          className="text-xl font-bold hover:text-green-200 transition"
        >
          Blog System
        </Link>

        <div className="flex gap-6 items-center">
          <Link className="hover:text-green-200" to="/users">
            Users
          </Link>
          <Link className="hover:text-green-200" to="/posts">
            Posts
          </Link>
          <Link className="hover:text-green-200" to="/comments">
            Comments
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-sm hover:text-green-200">
                Welcome, <strong>{user.name}</strong>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-200 transition font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
