export default function MaintenanceLoading() {
  return (
    <div className="animate-pulse">
      {/* Page Header */}
      <div className="mb-6">
        <div className="h-8 w-56 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
        <div className="h-4 w-80 rounded bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-lg bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-7 w-44 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-10 w-36 rounded-md bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div className="flex-1 min-w-[250px]">
          <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-32">
            <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-800 mb-1" />
            <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
          </div>
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
