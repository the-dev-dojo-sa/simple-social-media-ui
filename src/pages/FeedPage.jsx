import React from "react";
import PostForm from "../components/posts/PostForm";
import PostsList from "../components/posts/PostsList";
import Sidebar from "../components/layout/Sidebar";
import LoadingSkeleton from "../components/shared/LoadingSkeleton";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useFetch } from "../hooks/useFetch";
import { getPosts } from "../services/api";

export default function FeedPage() {
    const { data: posts, loading, error } = useFetch(getPosts);

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <section className="md:w-2/4">
                <PostForm />

                {loading && <LoadingSkeleton />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && <PostsList posts={posts} />}
            </section>

            {/* Right Sidebar - Trending */}
            <aside className="md:w-1/4 bg-white rounded-lg shadow p-4 hidden md:block">
                <h2 className="font-semibold text-lg mb-4">Trending</h2>
                <ul className="space-y-3">
                    <li className="text-sm">
                        <span className="block truncate">#SummerVibes</span>
                        <span className="text-xs text-gray-500">2.1M posts</span>
                    </li>
                    <li className="text-sm">
                        <span className="block truncate">#TechNews</span>
                        <span className="text-xs text-gray-500">1.8M posts</span>
                    </li>
                    <li className="text-sm">
                        <span className="block truncate">#FitnessMotivation</span>
                        <span className="text-xs text-gray-500">3.4M posts</span>
                    </li>
                </ul>
            </aside>
        </div>
    );
}
