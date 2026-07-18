import Link from "next/link";
import { auth } from "../../auth";
import { getPublishedGrades } from "@/lib/curriculum";

export const dynamic = "force-dynamic";

const groups = [
  { title: "Khởi đầu", subtitle: "Mầm non · 20 unit cho trẻ 3–6 tuổi", slugs: ["mam-non"], color: "bg-orange-50 border-orange-200" },
  { title: "Tiểu học", subtitle: "Lớp 1–5 · Pilot đang mở", slugs: ["lop-1", "lop-2", "lop-3", "lop-4", "lop-5"], color: "bg-emerald-50 border-emerald-200" },
  { title: "Trung học", subtitle: "Lớp 6–12", slugs: ["lop-6", "lop-7", "lop-8", "lop-9", "lop-10", "lop-11", "lop-12"], color: "bg-sky-50 border-sky-200" },
];

export default async function Home() {
  const [grades, session] = await Promise.all([getPublishedGrades(), auth()]);
  const firstUnit = grades.flatMap((grade) => grade.courses.flatMap((course) => course.units.map((unit) => ({ grade, unit })))).at(0);
  return (
    <main className="min-h-screen bg-[#f5f8f5] text-[#163129]">
      <header className="border-b border-[#dce6df] bg-white/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 font-black"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-700 text-xl text-white">E</span>English123</Link>
          <nav className="flex items-center gap-2 text-sm font-bold">
            {session?.user ? <><Link href="/dashboard" className="rounded-xl px-3 py-2 hover:bg-emerald-50">Bảng học</Link><Link href="/review" className="rounded-xl px-3 py-2 hover:bg-emerald-50">Ôn tập</Link></> : <><Link href="/login" className="px-3 py-2">Đăng nhập</Link><Link href="/register" className="rounded-xl bg-emerald-700 px-4 py-2 text-white">Học thử</Link></>}
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_.7fr] lg:py-16">
        <div className="rounded-[2rem] bg-[#173c32] p-7 text-white shadow-xl sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-300">Học mỗi ngày, tiến bộ mỗi tuần</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">Tiếng Anh vừa sức, đúng lộ trình của em.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/80">Bài học 5–10 phút với từ vựng, nghe, nói, viết và trò chơi. Tiến độ và lịch ôn được lưu riêng cho từng học sinh.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={session?.user ? "/dashboard" : "/register"} className="rounded-2xl bg-[#ffca69] px-6 py-3 font-black text-[#173c32]">{session?.user ? "Tiếp tục học" : "Bắt đầu học thử"}</Link>
            {firstUnit && <Link href={`/learn/${firstUnit.grade.slug}/${firstUnit.unit.slug}`} className="rounded-2xl border border-white/25 px-6 py-3 font-bold">Xem bài mẫu</Link>}
          </div>
        </div>
        <aside className="rounded-[2rem] border border-[#dbe7df] bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-bold text-emerald-700">Lộ trình Mầm non</p>
          <p className="mt-2 text-4xl font-black">20 unit</p>
          <div className="mt-7 space-y-4 text-sm">
            {["60 lesson Letters, Numbers, Words", "216 hoạt động và trò chơi", "Mẫu câu nghe–nói theo từng chủ đề", "Ôn tập cách quãng 1–3–7–14 ngày"].map((item) => <p key={item} className="flex gap-3"><span className="text-emerald-600">✓</span>{item}</p>)}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-6"><p className="text-sm font-bold uppercase tracking-[.16em] text-emerald-700">Chương trình K–12</p><h2 className="mt-2 text-3xl font-black">Chọn cấp học phù hợp</h2></div>
        <div className="grid gap-5 lg:grid-cols-3">
          {groups.map((group) => <article key={group.title} className={`rounded-3xl border p-5 ${group.color}`}>
            <h3 className="text-xl font-black">{group.title}</h3><p className="mt-1 text-sm text-slate-600">{group.subtitle}</p>
            <div className="mt-5 space-y-2">
              {grades.filter((grade) => group.slugs.includes(grade.slug)).map((grade) => {
                const unit = grade.courses[0]?.units[0];
                return <div key={grade.id} className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm"><div><p className="font-bold">{grade.name}</p><p className="text-xs text-slate-500">{grade.courses.flatMap((course) => course.units).length} unit</p></div>{unit ? <Link href={`/learn/${grade.slug}/${unit.slug}`} className="rounded-xl bg-emerald-700 px-3 py-2 text-sm font-bold text-white">Học</Link> : <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">Sắp có</span>}</div>;
              })}
            </div>
          </article>)}
        </div>
      </section>
    </main>
  );
}
