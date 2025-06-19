import React from "react";

export default function Sidebar() {
    return (
        <aside className="md:w-1/4 bg-white rounded-lg shadow p-4 hidden md:block">
            <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
            <ul className="space-y-2">
                <li>
                    <a href="#" className="text-blue-600 hover:underline">
                        Friends
                    </a>
                </li>
                <li>
                    <a href="#" className="text-blue-600 hover:underline">
                        Groups
                    </a>
                </li>
                <li>
                    <a href="#" className="text-blue-600 hover:underline">
                        Events
                    </a>
                </li>
                <li>
                    <a href="#" className="text-blue-600 hover:underline">
                        Marketplace
                    </a>
                </li>
            </ul>
        </aside>
    );
}
