// app/user/layout.js
export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
    </div>
  );
}
