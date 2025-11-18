import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(post);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border p-4 rounded-lg shadow-sm flex flex-col gap-3"
    >
      <input
        name="title"
        value={post.title}
        onChange={handleChange}
        placeholder="Post Title"
        className="border p-2 rounded-md"
      />

      <textarea
        name="content"
        value={post.content}
        onChange={handleChange}
        placeholder="Content..."
        className="border p-2 rounded-md min-h-[120px]"
      />

      <button className="bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition">
        Publish Post
      </button>
    </form>
  );
}
