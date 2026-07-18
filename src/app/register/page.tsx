import RegisterForm from "./register-form";

export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center bg-emerald-50 px-4 py-8"><section className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl"><h1 className="text-3xl font-black">Bắt đầu học thử</h1><p className="mt-2 text-sm text-slate-600">Tạo tài khoản trong một phút. Em có thể tự chọn bất kỳ lộ trình nào sau khi đăng nhập.</p><RegisterForm/></section></main>;
}
