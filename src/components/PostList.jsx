import { useEffect, useState } from "react";

export default function PostList({ newPost }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=9")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  useEffect(() => {
    if (newPost) setPosts((prev) => [newPost, ...prev]);
  }, [newPost]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
