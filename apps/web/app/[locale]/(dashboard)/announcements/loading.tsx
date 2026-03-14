export default function AnnouncementsLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 w-44 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
          <div className="h-4 w-64 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="h-10 w-40 rounded-md bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Announcement Cards */}
      <div className="rounded-lg bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="px-6 py-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
              </div>
              <div className="h-6 w-6 rounded bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800 mt-2 mb-1" />
            <div className="h-4 w-3/4 rounded bg-gray-50 dark:bg-gray-800" />
            <div className="h-3 w-28 rounded bg-gray-50 dark:bg-gray-800 mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
