import { ContentStatus, Role } from "@prisma/client";

export function canManageContent(role: Role) {
  return role === Role.EDITOR || role === Role.ADMIN;
}

export function canTransitionContent(role: Role, target: ContentStatus) {
  if (!canManageContent(role)) return false;
  if (target === ContentStatus.PUBLISHED) return role === Role.ADMIN;
  return true;
}
