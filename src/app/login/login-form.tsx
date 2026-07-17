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
    const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false });
    setPending(false);
    if (result?.error) return setError("Email hoặc mật khẩu chưa đúng.");
    router.push(params.get("next") || "/dashboard"); router.refresh();
  }
  return <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-bold">Email<input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal"/></label><label className="block text-sm font-bold">Mật khẩu<input required minLength={8} name="password" type="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal"/></label><a href="/forgot-password" className="block text-right text-sm font-bold text-emerald-700">Quên mật khẩu?</a>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={pending} className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-black text-white disabled:opacity-60">{pending ? "Đang đăng nhập…" : "Đăng nhập"}</button></form>;
}
