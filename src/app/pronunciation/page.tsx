import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import PronunciationCourse from "./course";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import { pronunciationLessons, pronunciationLessonIds } from "@/lib/pronunciation-course";

export default async function PronunciationPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const learner = await getActiveLearner();
  const progress = await prisma.productEvent.findMany({ where: { learnerProfileId: learner.id, name: "pronunciation_practiced", entityType: "PronunciationLesson", entityId: { in: pronunciationLessonIds } }, select: { entityId: true }, distinct: ["entityId"] });
  return <main className="min-h-screen bg-slate-50 px-4 py-5 text-slate-900"><div className="mx-auto max-w-4xl">
    <Link href="/dashboard" className="text-sm font-bold text-emerald-800">← Bảng học</Link>
    <h1 className="mt-4 text-2xl font-black">Học phát âm</h1>
    <p className="mt-2 text-sm text-slate-600">{pronunciationLessons.length} bài Anh–Mỹ · Bảng nguyên âm, nguyên âm đôi, phụ âm và phát âm trong hội thoại.</p>
    <p className="mt-2 text-xs leading-5 text-slate-500">Ký hiệu dùng /i, u, ɛ, ɹ/; một số từ điển ghi /iː, uː, e, r/. /ɔ/ được giữ để giới thiệu biến thể chưa gộp cot–caught. Mẫu đọc là từ/câu chứa âm, không đọc tên ký hiệu IPA.</p>
    <PronunciationCourse key={learner.id} initialDone={progress.flatMap((event) => event.entityId ? [event.entityId] : [])}/>
    <p className="mt-5 text-xs text-slate-500">Tham khảo thêm: <a href="https://feeds.bbci.co.uk/learningenglish/english/features/pronunciation/" className="underline">BBC Pronunciation</a> · <a href="https://www.britishcouncil.org/english/business/apps/sounds-right" className="underline">British Council Sounds Right</a>. Nội dung hướng dẫn trên trang được biên soạn riêng.</p>
  </div></main>;
}
