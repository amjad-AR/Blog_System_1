import { useState, useEffect } from "react";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import { getComments, createComment } from "../api/commentApi";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await getComments();
        setComments(res.data || []);
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    }

    fetchComments();
  }, []);

  async function addComment(newComment) {
    try {
      // attach logged-in user id if available
      const raw = localStorage.getItem("user");
      const me = raw ? JSON.parse(raw) : null;
      const payload = {
        postId: newComment.postId,
        userId: me?._id,
        content: newComment.content,
      };

      const res = await createComment(payload);
      const created = res.data || payload;
      setComments([...comments, created]);
    } catch (err) {
      console.error("Failed to create comment:", err);
      setComments([...comments, newComment]);
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Comments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CommentForm onSubmit={addComment} />
        </div>

        <div className="md:col-span-2 grid gap-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet…</p>
          ) : (
            comments.map((comment, idx) => (
              <CommentCard key={idx} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
