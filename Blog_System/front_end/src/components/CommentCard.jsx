export default function CommentCard({ comment }) {
  const authorName = comment.userId?.name || "Unknown";
  return (
    <div className="border bg-white p-3 rounded-md shadow-sm">
      <p className="text-gray-800">{comment.content}</p>
      <p className="text-sm text-gray-500 mt-2">By: {authorName}</p>
    </div>
  );
}
