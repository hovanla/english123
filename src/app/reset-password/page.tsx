import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPasswordPage() { return <main className="grid min-h-screen place-items-center bg-emerald-50 p-4"><Suspense fallback={<p>Đang tải…</p>}><ResetPasswordForm/></Suspense></main>; }
