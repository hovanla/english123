import { describe, expect, it } from "vitest";
import { displayNameFromLogin, loginIdentifierSchema, MIN_PASSWORD_LENGTH, normalizeLoginIdentifier } from "./login-identifier";

describe("login identifier", () => {
  it("accepts a simple username and normalizes case", () => {
    expect(loginIdentifierSchema.parse("  MinhAnh  ")).toBe("minhanh");
  });

  it("keeps existing email logins compatible", () => {
    expect(normalizeLoginIdentifier("Admin@Gmail.com")).toBe("admin@gmail.com");
  });

  it("uses the readable login as learner display name", () => {
    expect(displayNameFromLogin("Minh Anh")).toBe("Minh Anh");
    expect(displayNameFromLogin("parent@example.com")).toBe("parent");
  });

  it("allows four-character passwords in the UI and API contract", () => {
    expect(MIN_PASSWORD_LENGTH).toBe(4);
  });
});
