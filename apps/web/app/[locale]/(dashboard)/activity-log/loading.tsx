export default function ActivityLogLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header */}
      <div className="mb-6">
        <div className="h-8 w-40 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
        <div className="h-4 w-64 rounded bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex-1 min-w-[220px]">
          <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="w-full sm:w-40">
          <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="w-full sm:w-40">
          <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="w-full sm:w-40">
          <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="rounded-lg bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
                <div className="h-3 w-1/3 rounded bg-gray-50 dark:bg-gray-800" />
              </div>
              <div className="shrink-0 text-right">
                <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
                <div className="h-3 w-12 rounded bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
