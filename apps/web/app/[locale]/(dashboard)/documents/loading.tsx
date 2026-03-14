export default function DocumentsLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 w-40 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
          <div className="h-4 w-60 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="h-10 w-36 rounded-md bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Search Bar */}
      <div className="h-12 w-full rounded-lg bg-gray-100 dark:bg-gray-800 mb-5" />

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>

      {/* Table */}
      <div className="space-y-3">
        <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 rounded bg-gray-50 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  );
}
