import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English123",
  description: "Nền tảng tự học tiếng Anh theo lộ trình dành cho học sinh Việt Nam từ Mầm non đến Lớp 12.",
  openGraph: { title: "English123", description: "Học tiếng Anh vừa sức, đúng lộ trình của em.", type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
