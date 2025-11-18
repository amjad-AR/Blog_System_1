import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { getPosts, createPost } from "../api/postApi";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/commentApi";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await getPosts();
        setPosts(res.data || []);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    }

    fetchPosts();
    // fetch comments as well
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

  async function addPost(newPost) {
    try {
      // attach logged-in user id if available
      const raw = localStorage.getItem("user");
      const me = raw ? JSON.parse(raw) : null;
      const payload = {
        userId: me?._id,
        title: newPost.title,
        content: newPost.content,
      };

      const res = await createPost(payload);
      const created = res.data || newPost;
      setPosts([...posts, created]);
    } catch (err) {
      console.error("Failed to create post:", err);
      setPosts([...posts, newPost]);
    }
  }

  // Add comment to a post
  async function addCommentToPost(postId, content) {
    try {
      const raw = localStorage.getItem("user");
      const me = raw ? JSON.parse(raw) : null;
      const payload = {
        postId,
        userId: me?._id,
        content,
      };

      const res = await createComment(payload);
      const created = res.data || payload;
      setComments((prev) => [...prev, created]);
    } catch (err) {
      console.error("Failed to create comment:", err);
    }
  }

  async function updateCommentHandler(commentId, data) {
    try {
      const res = await updateComment(commentId, data);
      const updated = res.data || res;
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? updated : c))
      );
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  }

  async function deleteCommentHandler(commentId) {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <PostForm onSubmit={addPost} />
        </div>

        <div className="md:col-span-2 grid gap-4">
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet…</p>
          ) : (
            posts.map((post, idx) => (
              <PostCard
                key={idx}
                post={post}
                comments={
                  comments.filter((c) => {
                    // comment.postId may be populated object or id
                    const pid = c.postId?._id || c.postId;
                    return pid === post._id;
                  }) || []
                }
                onAddComment={(content) => addCommentToPost(post._id, content)}
                onUpdateComment={updateCommentHandler}
                onDeleteComment={deleteCommentHandler}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
