import { ContentStatus, Role } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { canManageContent, canTransitionContent } from "./authorization";

describe("content authorization", () => {
  it("keeps parents out of CMS mutations", () => expect(canManageContent(Role.PARENT)).toBe(false));
  it("allows editors to submit drafts for review", () => expect(canTransitionContent(Role.EDITOR, ContentStatus.IN_REVIEW)).toBe(true));
  it("does not allow editors to publish", () => expect(canTransitionContent(Role.EDITOR, ContentStatus.PUBLISHED)).toBe(false));
  it("allows admins to publish", () => expect(canTransitionContent(Role.ADMIN, ContentStatus.PUBLISHED)).toBe(true));
});
