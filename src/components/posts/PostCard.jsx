import React from "react";
import LikeIcon from "../ui/LikeIcon";
import CommentIcon from "../ui/CommentIcon";

export default function PostCard({ post }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 flex items-center">
                <img
                    src="https://placehold.co/100x100?text=User"
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h3 className="font-semibold">{post.owner?.username || "Anonymous"}</h3>
                    <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="px-4 pb-4">
                <p>{post.content}</p>
                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt="Post"
                        className="mt-3 rounded-lg max-w-full h-auto"
                    />
                )}
            </div>
            <div className="border-t border-gray-200 px-4 py-2 flex justify-between text-sm text-gray-600">
                <button className="hover:text-blue-600 transition-colors flex items-center">
                    <LikeIcon /> Like ({post.likes})
                </button>
                <button className="hover:text-blue-600 transition-colors flex items-center">
                    <CommentIcon /> Comment
                </button>
            </div>
        </div>
    );
}
