export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
    >
      {children}
    </button>
  );
}
