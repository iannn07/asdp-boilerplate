export function capitalize(str: string): string {
  if (!str) return str
  
return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, word => capitalize(word))
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(str: string, maxLength: number, suffix = '…'): string {
  if (str.length <= maxLength) return str
  
return str.slice(0, maxLength - suffix.length).trimEnd() + suffix
}

export function initials(name: string, max = 2): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, max)
    .map(part => part.charAt(0).toUpperCase())
    .join('')
}
