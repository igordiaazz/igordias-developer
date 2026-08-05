export function cn(...classes: Array<string | number | null | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
