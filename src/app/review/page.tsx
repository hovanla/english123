import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import ReviewList from "./review-list";

export default async function ReviewPage() {
  if (!(await auth())?.user) redirect("/login?next=/review");
  return <main className="min-h-screen bg-[#f5f8f5] text-[#163129]"><div className="mx-auto max-w-5xl px-4 py-7"><Link href="/dashboard" className="font-black">← Bảng học</Link><header className="mt-6 rounded-[2rem] bg-emerald-900 p-7 text-white sm:p-10"><p className="text-sm font-black uppercase tracking-wider text-emerald-300">Ôn tập cách quãng</p><h1 className="mt-2 text-4xl font-black">Ôn tập hôm nay</h1><p className="mt-3 max-w-2xl text-emerald-50/80">Những nội dung em đã học sẽ quay lại sau 1, 3, 7 và 14 ngày để ghi nhớ lâu hơn.</p></header><ReviewList/></div></main>;
}
