export default function ServiceProvidersLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header */}
      <div className="mb-6">
        <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
        <div className="h-4 w-72 rounded bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Search Bar */}
      <div className="h-12 w-full rounded-lg bg-gray-100 dark:bg-gray-800 mb-5" />

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="h-4 w-4 rounded bg-gray-100 dark:bg-gray-800" />
              ))}
            </div>
            <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800 mb-1" />
            <div className="h-4 w-2/3 rounded bg-gray-50 dark:bg-gray-800 mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-48 rounded bg-gray-50 dark:bg-gray-800" />
              <div className="h-4 w-36 rounded bg-gray-50 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
