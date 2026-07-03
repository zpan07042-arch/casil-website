import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
    <html lang="zh-CN" className="h-full overflow-x-hidden" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
