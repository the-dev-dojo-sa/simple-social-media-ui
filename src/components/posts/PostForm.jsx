import React, { useState } from "react";
import { createPost } from "../../services/api";

export default function PostForm() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            const newPost = await createPost({
                content,
                image_url: "https://placehold.co/600x400?text=New+Post",
            });
            window.location.reload(); // Refresh to show new post
        } catch (err) {
            alert("Error submitting post: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="3"
      ></textarea>
            <div className="flex justify-between items-center mt-3">
                <button
                    type="button"
                    className="text-gray-600 hover:text-red-500 transition-colors flex items-center"
                >
                    📷 Photo
                </button>
                <button
                    type="submit"
                    disabled={!content.trim() || loading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        content.trim() && !loading
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </form>
    );
}
