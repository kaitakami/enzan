export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // remove leading/trailing hyphens
    .replace(/-{2,}/g, '-') // replace multiple hyphens with a single hyphen
    .trim(); // remove any leading/trailing whitespace
}
