import React from "react";

export default function MessagesPage() {
    return (
        <section className="md:w-2/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Messages</h2>
                <p className="text-gray-600">You have no messages yet.</p>
            </div>
        </section>
    );
}
