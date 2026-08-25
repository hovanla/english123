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
    if (!response.ok) { setPending(false); setError(response.status === 409 ? "Tên đăng nhập này đã được sử dụng." : "Thông tin chưa hợp lệ. Hãy kiểm tra lại."); return; }
    await signIn("credentials", { login: form.get("login"), password: form.get("password"), redirect: false }); router.push("/dashboard"); router.refresh();
  }
  const field = "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal";
  return <form onSubmit={submit} className="mt-5 space-y-3.5"><label className="block text-sm font-bold">Tên đăng nhập<input className={field} required name="login" type="text" autoComplete="username" minLength={2} maxLength={80} placeholder="Ví dụ: minhanh"/><span className="mt-1.5 block text-xs font-normal text-slate-500">Có thể dùng tên hoặc email.</span></label><label className="block text-sm font-bold">Mật khẩu<input className={field} required name="password" type="password" autoComplete="new-password" minLength={4} placeholder="Từ 4 ký tự"/></label><label className="flex gap-3 rounded-xl bg-slate-50 p-3 text-xs leading-5"><input required name="parentalConsent" type="checkbox" className="mt-1 h-4 w-4 shrink-0"/><span>Tôi đồng ý tạo hồ sơ học tập theo <a href="/privacy" target="_blank" className="font-bold text-emerald-700">chính sách riêng tư</a>.</span></label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={pending} className="min-h-12 w-full rounded-xl bg-emerald-700 px-4 py-3 font-black text-white disabled:opacity-60">{pending ? "Đang tạo…" : "Tạo tài khoản"}</button></form>;
}
