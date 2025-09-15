// lib/cn.js
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
