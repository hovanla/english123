import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import PronunciationCourse from "./course";

export default async function PronunciationPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return <main className="min-h-screen bg-slate-50 px-4 py-5 text-slate-900"><div className="mx-auto max-w-4xl">
    <Link href="/dashboard" className="text-sm font-bold text-emerald-800">← Bảng học</Link>
    <h1 className="mt-4 text-2xl font-black">Học phát âm</h1>
    <p className="mt-2 text-sm text-slate-600">12 bài nền tảng · Nghe khác biệt, tập khẩu hình, đọc từ rồi đọc câu.</p>
    <PronunciationCourse/>
    <p className="mt-5 text-xs text-slate-500">Tham khảo thêm: <a href="https://feeds.bbci.co.uk/learningenglish/english/features/pronunciation/" className="underline">BBC Pronunciation</a> · <a href="https://www.britishcouncil.org/english/business/apps/sounds-right" className="underline">British Council Sounds Right</a>. Nội dung hướng dẫn trên trang được biên soạn riêng.</p>
  </div></main>;
}
