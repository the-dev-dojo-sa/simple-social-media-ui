export default function LoadingSkeleton() {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/6"></div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
