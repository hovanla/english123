"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter(); const params = useSearchParams();
  const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", { login: data.get("login"), password: data.get("password"), redirect: false });
    setPending(false);
    if (result?.error) return setError("Tên đăng nhập hoặc mật khẩu chưa đúng.");
    router.push(params.get("next") || "/dashboard"); router.refresh();
  }
  return <form onSubmit={submit} className="mt-5 space-y-3.5"><label className="block text-sm font-bold">Tên đăng nhập<input required name="login" type="text" autoComplete="username" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="Tên hoặc email"/></label><label className="block text-sm font-bold">Mật khẩu<input required minLength={4} name="password" type="password" autoComplete="current-password" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="Từ 4 ký tự"/></label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={pending} className="min-h-12 w-full rounded-xl bg-emerald-700 px-4 py-3 font-black text-white disabled:opacity-60">{pending ? "Đang đăng nhập…" : "Đăng nhập"}</button><a href="/forgot-password" className="block text-center text-xs font-bold text-emerald-700">Quên mật khẩu tài khoản email?</a></form>;
}
