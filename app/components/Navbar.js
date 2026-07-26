'use client';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
}) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-zinc-300 dark:border-zinc-800 duration-300">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        <h1 className="text-2xl font-bold text-red-500">
          Zayd Khan
        </h1>

        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full max-w-xl px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-400 dark:border-zinc-700 outline-none text-black dark:text-white"
        />

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}