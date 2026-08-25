import Link from "next/link";
import LoginForm from "./login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center bg-emerald-50 px-4 py-6"><section className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg sm:p-6"><Link href="/" className="text-sm font-black text-emerald-800">← English123</Link><h1 className="mt-5 text-2xl font-black">Đăng nhập</h1><p className="mt-1.5 text-sm text-slate-600">Tiếp tục bài học đang dở.</p><Suspense fallback={<p className="mt-5">Đang tải…</p>}><LoginForm/></Suspense><p className="mt-4 text-center text-sm">Chưa có tài khoản? <Link href="/register" className="font-bold text-emerald-700">Tạo tài khoản</Link></p></section></main>;
}
