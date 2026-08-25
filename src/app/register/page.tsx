import RegisterForm from "./register-form";

export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center bg-emerald-50 px-4 py-6"><section className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg sm:p-6"><h1 className="text-2xl font-black">Tạo tài khoản</h1><p className="mt-1.5 text-sm text-slate-600">Chỉ cần tên đăng nhập và mật khẩu.</p><RegisterForm/></section></main>;
}
