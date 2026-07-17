# Checklist phát hành pilot

- [ ] Production và Preview dùng hai PostgreSQL riêng.
- [ ] Migration đã chạy và seed tạo đúng 10 unit Lớp 1–5.
- [ ] Đã tạo admin bằng mật khẩu mạnh và xóa biến bootstrap sau seed.
- [ ] Email đặt lại mật khẩu gửi được từ domain đã xác minh.
- [ ] Blob upload hoạt động; từng asset có nguồn, giấy phép và alt text.
- [ ] Chính sách riêng tư đã được người phụ trách pháp lý duyệt.
- [ ] Kiểm thử đăng ký, tách dữ liệu hai học sinh, học lesson và ôn tập đã đạt.
- [ ] Không có bản nháp xuất hiện ở trang học sinh.
- [ ] Backup PostgreSQL và khôi phục thử nghiệm thành công.
- [ ] Log production không chứa email, bài viết tự do, transcript hay token.
- [ ] Dashboard analytics ghi nhận đúng các sự kiện pilot.
- [ ] Nhóm phụ huynh thử nghiệm biết cách gửi phản hồi và yêu cầu xóa dữ liệu.
