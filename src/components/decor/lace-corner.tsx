export function LaceCornerTL() {
  return (
    <svg className="absolute -top-2 -left-2 size-14 text-zinc-300/30 pointer-events-none" viewBox="0 0 64 64" fill="none">
      <path d="M0 32 Q0 0 32 0" stroke="currentColor" strokeWidth="0.8" />
      <path d="M4 32 Q4 6 32 6" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="16" cy="10" r="2" fill="#f0c8d8" opacity="0.5" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="22" cy="6" r="1" fill="#f8bbd0" opacity="0.4" />
      <path d="M28 2 Q30 0 32 0" stroke="currentColor" strokeWidth="0.4" />
      <path d="M2 28 Q0 30 0 32" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export function LaceCornerTR() {
  return (
    <svg className="absolute -top-2 -right-2 size-14 text-zinc-300/30 pointer-events-none scale-x-[-1]" viewBox="0 0 64 64" fill="none">
      <path d="M0 32 Q0 0 32 0" stroke="currentColor" strokeWidth="0.8" />
      <path d="M4 32 Q4 6 32 6" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="16" cy="10" r="2" fill="#f0c8d8" opacity="0.5" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
      <path d="M28 2 Q30 0 32 0" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export function LaceCornerBR() {
  return (
    <svg className="absolute -bottom-2 -right-2 size-14 text-zinc-300/30 pointer-events-none scale-y-[-1] scale-x-[-1]" viewBox="0 0 64 64" fill="none">
      <path d="M0 32 Q0 0 32 0" stroke="currentColor" strokeWidth="0.8" />
      <path d="M4 32 Q4 6 32 6" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="16" cy="10" r="2" fill="#f0c8d8" opacity="0.5" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
      <path d="M28 2 Q30 0 32 0" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export function LaceCornerBL() {
  return (
    <svg className="absolute -bottom-2 -left-2 size-14 text-zinc-300/30 pointer-events-none scale-y-[-1]" viewBox="0 0 64 64" fill="none">
      <path d="M0 32 Q0 0 32 0" stroke="currentColor" strokeWidth="0.8" />
      <path d="M4 32 Q4 6 32 6" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="16" cy="10" r="2" fill="#f0c8d8" opacity="0.5" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
      <path d="M28 2 Q30 0 32 0" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  );
}

export function LaceCorners() {
  return (
    <>
      <LaceCornerTL />
      <LaceCornerTR />
      <LaceCornerBR />
      <LaceCornerBL />
    </>
  );
}
