export default function Loading() {
    return (
        <main className="mx-auto max-w-3xl p-6">
            <div className="animate-pulse rounded-2xl border p-4">
                <div className="h-6 w-2/3 rounded bg-gray-200">
                </div>
                <div className="mt-4 h-4 w-full rounded bg-gray-200">
                </div>
                <div className="mt-2 h-4 w-5/6 rounded bg-gray-200">
                </div>
            </div>
        </main>
    )
}