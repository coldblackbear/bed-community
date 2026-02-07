import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import { AuthSection } from "@/components/auth/auth-section";
import { WriteButton } from "@/components/layout/write-button";
import { createClient } from "@/lib/supabase/server";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "침대 커뮤니티 - 숙면을 위한 모든 정보",
    template: "%s | 침대 커뮤니티"
  },
  description: "매트리스, 침대 프레임, 침구류, 베개 등 숙면을 위한 모든 정보를 공유하는 커뮤니티",
  keywords: ["매트리스", "침대", "숙면", "수면", "침구", "베개", "토퍼", "매트리스 추천", "매트리스 비교", "침대 리뷰"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "침대 커뮤니티",
    title: "침대 커뮤니티 - 숙면을 위한 모든 정보",
    description: "매트리스, 침대 프레임, 침구류, 베개 등 숙면을 위한 모든 정보를 공유하는 커뮤니티",
  },
  twitter: {
    card: "summary_large_image",
    title: "침대 커뮤니티 - 숙면을 위한 모든 정보",
    description: "매트리스, 침대 프레임, 침구류, 베개 등 숙면을 위한 모든 정보를 공유하는 커뮤니티",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_VERIFICATION || "",
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationJsonLd
          name="침대 커뮤니티"
          url={siteUrl}
        />
        <WebSiteJsonLd
          name="침대 커뮤니티"
          url={siteUrl}
          description="매트리스, 침대 프레임, 침구류, 베개 등 숙면을 위한 모든 정보를 공유하는 커뮤니티"
        />
        <ThemeProvider>
          <Header user={profile}>
            {profile && <WriteButton />}
            <AuthSection user={profile} />
          </Header>
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
              <main className="flex-1 min-w-0">{children}</main>
              <Sidebar />
            </div>
          </div>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
