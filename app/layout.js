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

export const metadata = {
  title: "DevCard.",
  description: "Instantly create stunning, professional developer and business cards without signing up. Showcase your skills, projects, and contact details in a sleek, shareable format."
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="ccf2ae1f-7c90-4c6c-99a7-1daa4b73595a"></script>
        <meta name="google-site-verification" content="yszqlDoRKS6U1tdVLGVIIxKyWd52VER3wa9TD6S5Psw" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
