# Triển khai English123 với Supabase và Vercel

English123 tiếp tục dùng SQLite khi phát triển local. Production dùng PostgreSQL của Supabase; không dùng Supabase Auth vì hệ thống đã có Auth.js.

## 1. Tạo Supabase project

1. Đăng nhập Supabase và tạo một project mới.
2. Chọn region gần người dùng Việt Nam, ưu tiên Singapore nếu có.
3. Lưu database password trong trình quản lý mật khẩu.
4. Trong project, bấm **Connect** và sao chép:
   - **Transaction pooler** cho `DATABASE_URL`.
   - **Direct connection** cho `DIRECT_URL`.
   - Nếu máy chạy migration không hỗ trợ IPv6, dùng **Session pooler** (port 5432) làm `DIRECT_URL`.

Không đưa connection string hoặc database password vào Git.

## 2. Cấu hình connection string

Ứng dụng Vercel dùng transaction pooler vì các function tạo nhiều kết nối ngắn:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
```

Prisma CLI dùng direct connection cho migration:

```env
DIRECT_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres?sslmode=require"
```

Không tự gõ hostname. Hãy lấy nguyên hai URL từ nút **Connect** của Supabase rồi bổ sung các query parameter còn thiếu.

## 3. Khởi tạo database

Đặt tạm `DATABASE_URL` và `DIRECT_URL` trong terminal hiện tại (hoặc thay `.env` local sau khi đã sao lưu nội dung), sau đó chạy:

```bash
npm run db:deploy
npm run db:seed
```

Seed tạo toàn bộ curriculum Mầm non đến Lớp 12 và tài khoản admin khi có:

```env
BOOTSTRAP_ADMIN_EMAIL="admin@example.com"
BOOTSTRAP_ADMIN_PASSWORD="a-strong-unique-password"
```

Sau lần seed đầu tiên, xóa `BOOTSTRAP_ADMIN_PASSWORD` khỏi máy và Vercel.

> Không chạy lại seed trên database đang có học sinh. Script sẽ chặn thao tác này. Chỉ sau khi backup và chủ động muốn xóa tiến độ mới đặt `ALLOW_DESTRUCTIVE_SEED=true`.

## 4. Cấu hình Vercel

Trong **Project → Settings → Environment Variables**, thêm cho Production:

- `DATABASE_URL`
- `DIRECT_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `NEXTAUTH_URL`
- `BLOB_READ_WRITE_TOKEN` khi bật upload asset
- `RESEND_API_KEY` và `EMAIL_FROM` khi bật email đặt lại mật khẩu

`AUTH_URL` và `NEXTAUTH_URL` phải là URL HTTPS thật, ví dụ:

```env
AUTH_URL="https://english123.vercel.app"
NEXTAUTH_URL="https://english123.vercel.app"
```

Không chạy migration trong mỗi request. Chạy `npm run db:deploy` trước lần phát hành có thay đổi schema.

## 5. Kiểm tra sau triển khai

1. Mở trang chủ và đăng nhập admin.
2. Tạo một tài khoản phụ huynh và hồ sơ học sinh thử.
3. Hoàn thành một activity rồi tải lại trang để xác nhận tiến độ còn nguyên.
4. Kiểm tra Supabase **Table Editor** có `User`, `LearnerProfile`, `ActivityAttempt` và `LessonProgress`.
5. Kiểm tra log Vercel không có `P1001`, `P2024`, `prepared statement already exists` hoặc `UntrustedHost`.
6. Trước pilot, xuất backup thủ công vì Supabase Free không có automatic backup.
