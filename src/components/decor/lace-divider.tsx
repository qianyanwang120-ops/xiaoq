export function LaceDivider() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #d4d4d4 0px, #d4d4d4 1px, transparent 1px, transparent 4px, #f0c8d8 4px, #f0c8d8 5px, transparent 5px, transparent 8px)",
          height: "2px",
        }}
      />
      <svg width="14" height="14" viewBox="0 0 16 16" className="flex-shrink-0">
        <circle cx="8" cy="8" r="2" fill="#f0c8d8" opacity="0.6" />
        <circle cx="8" cy="8" r="5" fill="none" stroke="#d4d4d4" strokeWidth="0.3" opacity="0.4" />
        <circle cx="8" cy="3.5" r="0.8" fill="#f8bbd0" opacity="0.4" />
        <circle cx="8" cy="12.5" r="0.8" fill="#f8bbd0" opacity="0.4" />
        <circle cx="3.5" cy="8" r="0.8" fill="#d4d4d4" opacity="0.3" />
        <circle cx="12.5" cy="8" r="0.8" fill="#d4d4d4" opacity="0.3" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #d4d4d4 0px, #d4d4d4 1px, transparent 1px, transparent 4px, #f0c8d8 4px, #f0c8d8 5px, transparent 5px, transparent 8px)",
          height: "2px",
        }}
      />
    </div>
  );
}

export function LaceDiamond() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" className="inline-block mx-1">
      <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#f0c8d8" opacity="0.4" />
      <path d="M6 2 L10 6 L6 10 L2 6 Z" fill="none" stroke="#d4d4d4" strokeWidth="0.3" opacity="0.6" />
    </svg>
  );
}

/* 粉色小花点缀 */
export function PinkDot() {
  return (
    <span className="inline-block size-1.5 rounded-full bg-pink-300/50 mx-0.5 align-middle" />
  );
}
