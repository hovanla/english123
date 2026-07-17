import Link from "next/link";
import LoginForm from "./login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center bg-emerald-50 px-4"><section className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl"><Link href="/" className="font-black text-emerald-800">← English123</Link><h1 className="mt-6 text-3xl font-black">Chào mừng trở lại</h1><p className="mt-2 text-sm text-slate-600">Đăng nhập bằng tài khoản phụ huynh.</p><Suspense fallback={<p className="mt-6">Đang tải…</p>}><LoginForm/></Suspense><p className="mt-5 text-center text-sm">Chưa có tài khoản? <Link href="/register" className="font-bold text-emerald-700">Đăng ký học thử</Link></p></section></main>;
}
