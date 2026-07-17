import { prisma } from "@/lib/prisma";
import RegisterForm from "./register-form";

export const dynamic = "force-dynamic";
export default async function RegisterPage() {
  const grades = await prisma.grade.findMany({ where: { slug: { in: ["lop-1", "lop-2", "lop-3", "lop-4", "lop-5"] } }, orderBy: { order: "asc" }, select: { slug: true, name: true } });
  return <main className="grid min-h-screen place-items-center bg-emerald-50 px-4 py-8"><section className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-xl"><h1 className="text-3xl font-black">Tạo tài khoản học thử</h1><p className="mt-2 text-sm text-slate-600">Phụ huynh tạo tài khoản và hồ sơ đầu tiên cho học sinh.</p><RegisterForm grades={grades}/></section></main>;
}
