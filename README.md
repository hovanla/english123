# English123

Nền tảng tự học tiếng Anh K–12 dành cho học sinh Việt Nam. Bản hiện tại có lộ trình Mầm non 20 unit và Lớp 1–5 với 10 unit, tổng cộng 90 lesson cùng tám dạng hoạt động tương tác.

## Chức năng đã có

- Lộ trình Mầm non 20 unit theo chuỗi chủ đề Hello → The Park, gồm Letters, Numbers, Words, Sentences và Games với nội dung tự biên soạn.
- Tài khoản phụ huynh, nhiều hồ sơ học sinh và chọn lớp.
- Phân quyền `PARENT`, `EDITOR`, `ADMIN` bằng Auth.js.
- Cây nội dung `Grade → Course → Unit → Lesson → Activity` với trạng thái soạn–duyệt–xuất bản.
- Flashcard, trắc nghiệm, ghép cặp, nghe–chọn, nghe–điền, luyện nói, mẫu câu và viết ngắn.
- Chấm điểm phía server, lưu attempt và hoàn thành lesson ở ngưỡng 70%.
- Dashboard tiến độ, lịch sử học và ôn tập riêng theo hồ sơ ở mốc 1–3–7–14 ngày.
- CMS có workflow, nhân bản unit, sắp xếp qua API, audit log, revision và upload asset kèm metadata bản quyền.
- Đặt lại mật khẩu bằng token 30 phút và email transactional.
- Analytics pilot không lưu bài viết hoặc bản ghi âm.
- Groq Whisper nhận dạng đoạn đọc ngắn, phản hồi độ khớp và các từ cần nói rõ hơn; không lưu tệp âm thanh.
- Phòng hội thoại nói hoặc nhắn tin theo từng unit, có tình huống đóng vai đời thực và không lưu nội dung chat vào database.

## Chạy local nhanh bằng SQLite

Môi trường phát triển không yêu cầu cài PostgreSQL. Tạo `.env` với:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="english123-local-development-secret-change-in-production"
AUTH_URL="http://localhost:3001"
NEXTAUTH_URL="http://localhost:3001"
AI_PROVIDER="groq"
GROQ_API_KEY=""
GROQ_BASE_URL="https://api.groq.com/openai/v1"
GROQ_CHAT_MODEL="openai/gpt-oss-20b"
GROQ_SPEECH_MODEL="whisper-large-v3-turbo"
GROQ_SAFETY_MODEL="meta-llama/llama-prompt-guard-2-86m"
NVIDIA_API_KEY=""
NVIDIA_BASE_URL="https://integrate.api.nvidia.com/v1"
NVIDIA_MODEL="openai/gpt-oss-20b"
NVIDIA_SAFETY_MODEL="nvidia/nemotron-3.5-content-safety"
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-5.6"
```

`GROQ_API_KEY` bật GPT-OSS 20B cho hội thoại và Whisper cho nhận dạng đoạn ghi âm. NVIDIA và OpenAI vẫn là phương án dự phòng cho phản hồi văn bản. Nếu không có Groq, ứng dụng dùng nhận diện giọng nói của trình duyệt khi được hỗ trợ.

Khởi tạo database local lần đầu rồi chạy ứng dụng:

```bash
npm install
npm run local:setup
npm run dev
```

`local:setup` tạo lại dữ liệu mẫu nên chỉ chạy khi muốn khởi tạo/reset database local và phải dừng server dev trước. Những lần sau chỉ cần `npm run dev`; hai lệnh này không generate đè Prisma engine đang chạy trên Windows.

## Chạy production với PostgreSQL

Yêu cầu Node.js 20+ và PostgreSQL. Sao chép `.env.example` thành `.env`, sau đó điền ít nhất:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/english123"
AUTH_SECRET="a-long-random-secret"
AUTH_URL="http://localhost:3001"
NEXTAUTH_URL="http://localhost:3001"
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

Production mặc định dùng Supabase PostgreSQL. Hướng dẫn đầy đủ nằm tại [`docs/SUPABASE_DEPLOYMENT.md`](docs/SUPABASE_DEPLOYMENT.md).

1. Tạo Supabase project; dùng Transaction pooler cho `DATABASE_URL` và Direct connection cho `DIRECT_URL`.
2. Khai báo `AUTH_SECRET`, `AUTH_URL`, `NEXTAUTH_URL`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`, `EMAIL_FROM` và `GROQ_API_KEY` nếu bật chấm phát âm và hội thoại AI.
3. Chạy `npm run db:deploy`, sau đó `npm run db:seed` một lần với thông tin bootstrap admin.
4. Sau lần seed đầu, xóa `BOOTSTRAP_ADMIN_PASSWORD` khỏi biến môi trường.
5. Bật backup tự động cho PostgreSQL và dùng môi trường Preview làm staging.

Asset upload giới hạn 10 MB và chỉ chấp nhận JPEG, PNG, WebP, MP3 hoặc WAV. Đoạn ghi âm luyện tập được giới hạn 4 MB, gửi tạm tới Groq Whisper và không được lưu trong database hoặc kho tệp. Phòng AI không gửi tên hoặc năm sinh hồ sơ, không lưu nội dung hội thoại và chặn dữ liệu liên hệ rõ ràng. Với người học dưới 13 tuổi, cần hoàn tất cấu hình bảo vệ dữ liệu phù hợp trước khi bật AI ở production.

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
