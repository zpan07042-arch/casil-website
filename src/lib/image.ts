/**
 * Get the image source URL.
 * If the src starts with http or https, return as-is.
 * Otherwise, prepend with a base path if needed.
 */
export function getImageSrc(src: string | null | undefined): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return src;
}
