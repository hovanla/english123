import { Role } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getAdminCurriculum } from "@/lib/curriculum";
import AdminWorkflow from "./admin-workflow";
import AssetUploader from "./asset-uploader";

export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const session = await auth(); if (!session?.user) redirect("/login?next=/admin"); if (session.user.role !== Role.EDITOR && session.user.role !== Role.ADMIN) redirect("/dashboard");
  const curriculum = JSON.parse(JSON.stringify(await getAdminCurriculum()));
  return <main className="min-h-screen bg-slate-100 text-slate-900"><header className="border-b bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"><Link href="/" className="font-black text-emerald-800">English123 CMS</Link><div className="flex items-center gap-3">{session.user.role === Role.ADMIN && <Link href="/admin/analytics" className="text-sm font-black">Analytics</Link>}<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">{session.user.role}</span></div></div></header><div className="mx-auto max-w-7xl px-4 py-8"><p className="text-sm font-black uppercase tracking-wider text-emerald-700">Quy trình nội dung</p><h1 className="mt-2 text-4xl font-black">Soạn · Duyệt · Xuất bản</h1><p className="mt-3 max-w-2xl text-slate-600">Biên tập viên tạo và gửi duyệt. Chỉ quản trị viên có thể xuất bản nội dung cho học sinh.</p><AssetUploader/><AdminWorkflow grades={curriculum} role={session.user.role}/></div></main>;
}
