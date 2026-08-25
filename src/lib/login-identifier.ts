import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 4;

export const loginIdentifierInputSchema = z.string()
  .trim()
  .min(2)
  .max(80);

export function normalizeLoginIdentifier(value: string) {
  return value.trim().toLocaleLowerCase("vi");
}

export const loginIdentifierSchema = loginIdentifierInputSchema.transform(normalizeLoginIdentifier);

export function displayNameFromLogin(value: string) {
  const trimmed = value.trim();
  const beforeAt = trimmed.includes("@") ? trimmed.split("@")[0] : trimmed;
  return beforeAt.slice(0, 50) || "Học viên";
}
