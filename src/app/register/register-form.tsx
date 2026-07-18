"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form); Object.assign(body, { parentalConsent: form.get("parentalConsent") === "on" });
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!response.ok) { setPending(false); setError(response.status === 409 ? "Email này đã có tài khoản." : "Thông tin chưa hợp lệ. Hãy kiểm tra lại."); return; }
    await signIn("credentials", { email: form.get("email"), password: form.get("password"), redirect: false }); router.push("/dashboard"); router.refresh();
  }
  const field = "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal";
  return <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-bold">Tên học sinh<input className={field} required name="learnerName" autoComplete="name" placeholder="Ví dụ: Minh Anh"/></label><label className="block text-sm font-bold">Email<input className={field} required name="email" type="email" autoComplete="email" placeholder="Email đăng nhập"/></label><label className="block text-sm font-bold">Mật khẩu<input className={field} required name="password" type="password" autoComplete="new-password" minLength={8} placeholder="Ít nhất 8 ký tự"/></label><label className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm"><input required name="parentalConsent" type="checkbox" className="mt-1 h-4 w-4 shrink-0"/><span>Tôi là phụ huynh/người giám hộ và đồng ý tạo hồ sơ học tập theo <a href="/privacy" target="_blank" className="font-bold text-emerald-700">chính sách riêng tư</a>.</span></label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={pending} className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-black text-white">{pending ? "Đang tạo…" : "Tạo tài khoản và học ngay"}</button></form>;
}
