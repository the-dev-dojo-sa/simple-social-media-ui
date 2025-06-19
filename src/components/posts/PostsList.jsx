import React from "react";
import PostCard from "./PostCard";

export default function PostsList({ posts }) {
    if (!posts || posts.length === 0) {
        return <p className="text-center text-gray-500">No posts yet.</p>;
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
