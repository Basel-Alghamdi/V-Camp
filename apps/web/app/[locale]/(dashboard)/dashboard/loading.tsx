export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header */}
      <div className="mb-6">
        <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
        <div className="h-4 w-72 rounded bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-lg bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] mb-6">
        {/* Transactions Table */}
        <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-16 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="space-y-3">
            <div className="h-10 rounded bg-gray-100 dark:bg-gray-800" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 rounded bg-gray-50 dark:bg-gray-800" />
            ))}
          </div>
        </div>

        {/* Sidebar: Activity + Calendar */}
        <div className="space-y-6">
          <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
            <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
                    <div className="h-3 w-1/2 rounded bg-gray-50 dark:bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-64 rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
