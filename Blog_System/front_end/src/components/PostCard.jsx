import { useState } from "react";

export default function PostCard({
  post,
  comments = [],
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}) {
  const authorName = post.userId?.name || "Unknown";
  const [commentText, setCommentText] = useState("");

  const meRaw = localStorage.getItem("user");
  const me = meRaw ? JSON.parse(meRaw) : null;

  function handleAdd(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (onAddComment) onAddComment(commentText.trim());
    setCommentText("");
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-bold text-green-700">{post.title}</h2>
      <p className="text-gray-700 mt-2">{post.content.slice(0, 120)}...</p>
      <p className="text-sm text-gray-500 mt-4">By: {authorName}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <CommentItem
              key={c._id}
              comment={c}
              postOwnerId={post.userId?._id || post.userId}
              currentUserId={me?._id}
              onUpdate={onUpdateComment}
              onDelete={onDeleteComment}
            />
          ))
        )}

        <form onSubmit={handleAdd} className="mt-3 flex flex-col gap-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="border p-2 rounded-md min-h-[80px]"
          />
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded-md">
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  postOwnerId,
  currentUserId,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content || "");

  const commentOwnerId = comment.userId?._id || comment.userId;
  const authorName = comment.userId?.name || "Unknown";

  function handleSave() {
    if (!text.trim()) return;
    if (onUpdate) onUpdate(comment._id, { content: text.trim() });
    setEditing(false);
  }

  function handleDelete() {
    if (onDelete) onDelete(comment._id);
  }

  const canEdit =
    currentUserId && commentOwnerId && currentUserId === commentOwnerId;
  const canDeleteByCommentOwner = canEdit;
  const canDeleteByPostOwner =
    currentUserId && postOwnerId && currentUserId === postOwnerId;

  return (
    <div className="border rounded-md p-2 my-2 bg-gray-50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-800">
            {editing ? (
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border p-1 rounded-md min-h-[60px]"
              />
            ) : (
              comment.content
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">By: {authorName}</p>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          {editing ? (
            <>
              <button onClick={handleSave} className="text-sm text-green-600">
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setText(comment.content || "");
                }}
                className="text-sm text-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {canEdit && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm text-blue-600"
                >
                  Edit
                </button>
              )}
              {(canDeleteByCommentOwner || canDeleteByPostOwner) && (
                <button onClick={handleDelete} className="text-sm text-red-600">
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
