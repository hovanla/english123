# English123

Nền tảng tự học tiếng Anh K–12 dành cho học sinh Việt Nam. Bản pilot hiện tập trung Lớp 1–5 với 10 unit, 30 lesson và tám dạng hoạt động tương tác.

## Chức năng đã có

- Tài khoản phụ huynh, nhiều hồ sơ học sinh và chọn lớp.
- Phân quyền `PARENT`, `EDITOR`, `ADMIN` bằng Auth.js.
- Cây nội dung `Grade → Course → Unit → Lesson → Activity` với trạng thái soạn–duyệt–xuất bản.
- Flashcard, trắc nghiệm, ghép cặp, nghe–chọn, nghe–điền, luyện nói, mẫu câu và viết ngắn.
- Chấm điểm phía server, lưu attempt và hoàn thành lesson ở ngưỡng 70%.
- Dashboard tiến độ, lịch sử học và ôn tập riêng theo hồ sơ ở mốc 1–3–7–14 ngày.
- CMS có workflow, nhân bản unit, sắp xếp qua API, audit log, revision và upload asset kèm metadata bản quyền.
- Đặt lại mật khẩu bằng token 30 phút và email transactional.
- Analytics pilot không lưu bài viết hoặc bản ghi âm.

## Chạy local nhanh bằng SQLite

Môi trường phát triển không yêu cầu cài PostgreSQL. Tạo `.env` với:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="english123-local-development-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

Khởi tạo database local lần đầu rồi chạy ứng dụng:

```bash
npm install
npm run local:setup
npm run dev
```

`local:setup` tạo lại dữ liệu mẫu nên chỉ chạy khi muốn khởi tạo/reset database local. Những lần sau chỉ cần `npm run dev`; lệnh này không generate lại Prisma engine nên có thể khởi động an toàn trên Windows.

## Chạy production với PostgreSQL

Yêu cầu Node.js 20+ và PostgreSQL. Sao chép `.env.example` thành `.env`, sau đó điền ít nhất:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/english123"
AUTH_SECRET="a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
BOOTSTRAP_ADMIN_EMAIL="admin@example.com"
BOOTSTRAP_ADMIN_PASSWORD="a-strong-password"
```

Khởi tạo database production:

```bash
npm install
npm run db:deploy
npm run db:seed
npm run dev
```

Admin đăng nhập qua `/login`, sau đó mở `/admin`. Không còn PIN mặc định.

## Chuyển dữ liệu MVP SQLite

Giữ file SQLite cũ ở `prisma/dev.db`, cấu hình `LEGACY_SQLITE_PATH` và chạy migration PostgreSQL trước:

```bash
npm run db:deploy
npm run db:legacy
```

Script giữ nguyên ID Grade, Unit và các nội dung cũ, chuyển chúng thành lesson/activity ở trạng thái `DRAFT`. Dữ liệu ôn tập dùng chung của MVP không được chuyển vì không xác định được chủ sở hữu học sinh.

## Production trên Vercel

1. Tạo PostgreSQL được quản lý và kết nối `DATABASE_URL` vào Vercel.
2. Khai báo `AUTH_SECRET`, `NEXTAUTH_URL`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY` và `EMAIL_FROM`.
3. Chạy `npm run db:deploy`, sau đó `npm run db:seed` một lần với thông tin bootstrap admin.
4. Sau lần seed đầu, xóa `BOOTSTRAP_ADMIN_PASSWORD` khỏi biến môi trường.
5. Bật backup tự động cho PostgreSQL và dùng môi trường Preview làm staging.

Asset upload giới hạn 10 MB và chỉ chấp nhận JPEG, PNG, WebP, MP3 hoặc WAV. Giọng nói được xử lý tạm trong trình duyệt; ứng dụng không lưu bản ghi âm.

## Kiểm tra

```bash
npm run lint
npm run test
npm run build
```

E2E cần database test riêng đã migrate/seed:

```bash
E2E_DATABASE_READY=1 npm run test:e2e
```

Mục tiêu pilot: ≥60% hoàn thành lesson đầu, ≥30% quay lại trong bảy ngày và ≥40% hoàn thành bài ôn đến hạn.
