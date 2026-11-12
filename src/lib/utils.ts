import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function resolveTemplates(text: string, values: Record<string, string>) {
  return text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, key: string) => values[key.trim()] ?? "");
}
