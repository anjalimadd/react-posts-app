import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function App() {
  const [newPost, setNewPost] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <PostForm onAddPost={setNewPost} />
        <section className="mt-12">
          <PostList newPost={newPost} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
