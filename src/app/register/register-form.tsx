"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm({ grades }: { grades: Array<{ slug: string; name: string }> }) {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form); Object.assign(body, { birthYear: Number(form.get("birthYear")), parentalConsent: form.get("parentalConsent") === "on" });
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!response.ok) { setPending(false); setError(response.status === 409 ? "Email này đã có tài khoản." : "Thông tin chưa hợp lệ. Hãy kiểm tra lại."); return; }
    await signIn("credentials", { email: form.get("email"), password: form.get("password"), redirect: false }); router.push("/dashboard"); router.refresh();
  }
  const field = "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal";
  return <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Tên phụ huynh<input className={field} required name="parentName" minLength={2}/></label><label className="text-sm font-bold">Email<input className={field} required name="email" type="email"/></label><label className="text-sm font-bold sm:col-span-2">Mật khẩu (ít nhất 8 ký tự)<input className={field} required name="password" type="password" minLength={8}/></label><label className="text-sm font-bold">Tên hiển thị của học sinh<input className={field} required name="learnerName"/></label><label className="text-sm font-bold">Năm sinh<input className={field} required name="birthYear" type="number" min={new Date().getFullYear()-20} max={new Date().getFullYear()-3}/></label><label className="text-sm font-bold sm:col-span-2">Lớp<select className={field} name="gradeSlug">{grades.map((grade) => <option key={grade.slug} value={grade.slug}>{grade.name}</option>)}</select></label><label className="flex gap-3 text-sm sm:col-span-2"><input required name="parentalConsent" type="checkbox"/><span>Tôi là phụ huynh/người giám hộ và đồng ý tạo hồ sơ học tập cho trẻ theo <a href="/privacy" target="_blank" className="font-bold text-emerald-700">chính sách riêng tư</a>.</span></label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</p>}<button disabled={pending} className="rounded-xl bg-emerald-700 px-4 py-3 font-black text-white sm:col-span-2">{pending ? "Đang tạo…" : "Tạo tài khoản"}</button></form>;
}
