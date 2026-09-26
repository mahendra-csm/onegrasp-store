export const RW_TITLE = "Research Writing";
export const RW_BATCH = "Sep 25, 2026";

export function formatSize(bytes) {
  if (!bytes) return "—";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0, n = bytes;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${u[i]}`;
}
