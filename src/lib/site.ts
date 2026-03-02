export const SITE_NAME = "Miguel Bonifaz";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, SITE_URL).toString();
}

