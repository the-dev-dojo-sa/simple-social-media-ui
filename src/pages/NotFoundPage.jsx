import React from "react";

export default function NotFoundPage() {
    return (
        <section className="md:w-2/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">404 Not Found</h2>
                <p className="text-gray-600">The page you're looking for doesn't exist.</p>
            </div>
        </section>
    );
}
