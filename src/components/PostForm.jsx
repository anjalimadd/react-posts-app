import { useState } from "react";

export default function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !body.trim()) {
      setError("Both title and body are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      const newPost = await res.json();
      onAddPost(newPost);
      setTitle("");
      setBody("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full max-w-xl mx-auto mb-8"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-[#1e3a8a]">
        Create New Post
      </h2>

      {error && (
        <p className="mb-4 text-red-600 font-semibold text-center text-sm sm:text-base">
          {error}
        </p>
      )}

      <label className="block mb-4">
        <span className="block text-gray-700 font-medium mb-1">Title</span>
        <input
          type="text"
          className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] text-sm sm:text-base"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </label>

      <label className="block mb-6">
        <span className="block text-gray-700 font-medium mb-1">Body</span>
        <textarea
          className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] text-sm sm:text-base"
          placeholder="Write your post content"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={loading}
        ></textarea>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1e3a8a] text-white font-semibold py-3 rounded-md hover:bg-[#1e3a8a] transition text-sm sm:text-base"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
