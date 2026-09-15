import { beforeEach, describe, expect, it, vi } from "vitest";
const db = vi.hoisted(() => ({ create: vi.fn(), findUnique: vi.fn() }));
vi.mock("@/lib/prisma", () => ({ prisma: { session: db } }));
import { createMobileSession, mobileTokenHash, readMobileUser } from "./mobile-session";
describe("mobile sessions", () => {
  beforeEach(() => vi.resetAllMocks());
  it("stores only a hash and issues different tokens", async () => {
    const a = await createMobileSession("user", 2);
    const b = await createMobileSession("user", 2);
    expect(a.token).not.toBe(b.token);
    expect(db.create.mock.calls[0][0].data.sessionToken).toBe(mobileTokenHash(a.token));
    expect(db.create.mock.calls[0][0].data.sessionToken).not.toContain(a.token);
  });
  it("rejects a password-reset session version and expired tokens", async () => {
    const token = `m1.1.${"a".repeat(64)}`;
    db.findUnique.mockResolvedValue({ expires: new Date(Date.now() + 10000), user: { sessionVersion: 2 } });
    await expect(readMobileUser(`Bearer ${token}`)).rejects.toMatchObject({ status: 401 });
    db.findUnique.mockResolvedValue({ expires: new Date(0), user: { sessionVersion: 1 } });
    await expect(readMobileUser(`Bearer ${token}`)).rejects.toMatchObject({ status: 401 });
  });
  it("rejects malformed tokens before querying the database", async () => {
    await expect(readMobileUser("Bearer fake")).rejects.toMatchObject({ status: 401 });
    expect(db.findUnique).not.toHaveBeenCalled();
  });
});
