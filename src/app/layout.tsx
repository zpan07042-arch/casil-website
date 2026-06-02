import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CASIL - 中國航天國際控股有限公司",
  description: "China Aerospace International Holdings Limited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" className="h-full">
      <body className="h-full flex flex-col">{children}</body>
    </html>
  );
}
