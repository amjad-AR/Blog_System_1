import { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState({
    postId: "",
    content: "",
  });

  function handleChange(e) {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(comment);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 border rounded-lg shadow-sm flex flex-col gap-3"
    >
      <input
        name="postId"
        value={comment.postId}
        onChange={handleChange}
        placeholder="Post ID"
        className="border p-2 rounded-md"
      />

      <textarea
        name="content"
        value={comment.content}
        onChange={handleChange}
        placeholder="Write a comment..."
        className="border p-2 rounded-md min-h-[100px]"
      />

      <button className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
        Add Comment
      </button>
    </form>
  );
}
