import { readFile } from "node:fs/promises";
import path from "node:path";

const FILE_NAME = /^[a-z0-9-]+\.webp$/;

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!FILE_NAME.test(file)) return new Response("Not found", { status: 404 });
  try {
    const bytes = await readFile(path.join(process.cwd(), "public", "grade-seven", "boards", file));
    return new Response(bytes, { headers: { "Cache-Control": "public, max-age=31536000, immutable", "Content-Type": "image/webp" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
