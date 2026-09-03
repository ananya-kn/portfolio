import { Providers } from "@/providers/providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const siteUrl = "https://www.ananyakn.dev";

const description =
  "Portfolio of Ananya K N, showcasing AI-integrated full-stack projects, skills, and experience in web development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ananya K N",
  description,
  applicationName: "Ananya K N",
  keywords: [
    "Ananya K N",
    "Ananya",
    "portfolio",
    "web developer",
    "full stack developer",
    "MERN stack developer",
    "AI projects",
    "projects",
  ],
  authors: [{ name: "Ananya K N", url: siteUrl }],
  creator: "Ananya K N",
  publisher: "Ananya K N",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Ananya K N",
    description,
    siteName: "Ananya K N",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Ananya K N",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananya K N",
    description,
    images: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased font-sans max-w-5xl mx-auto py-4 px-3 sm:px-4`}>
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteUrl}/#ananya-kn`,
              name: "Ananya K N",
              url: siteUrl,
              description,
              jobTitle: "Full-Stack Developer",
            }),
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none bg-gray-50 dark:bg-gray-900"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none hidden dark:block"
          style={{
            backgroundImage: `radial-gradient(circle, #4b5563 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            backgroundColor: '#111827',
          }}
        />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
