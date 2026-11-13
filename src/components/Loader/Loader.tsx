export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-sky-500" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
