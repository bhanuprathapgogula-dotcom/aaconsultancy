import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "A&A Consultancy",
  description: "Elite IT & Non-IT recruitment agency delivering executive search, contract staffing, and bulk hiring solutions PAN India.",
  metadataBase: new URL("https://aaconsultancy.com"),
  keywords: ["Recruitment Agency", "Staffing Solutions", "IT Recruitment", "Non-IT Staffing", "Manpower Consultancy", "Executive Search", "Bulk Sourcing", "Talent Placement"],
  authors: [{ name: "A&A Consultancy" }],
  icons: {
    icon: "/images/a&a.jpeg",
    shortcut: "/images/a&a.jpeg",
    apple: "/images/a&a.jpeg",
  },
  openGraph: {
    title: "A&A Consultancy | Premium 3D Sourcing & Placement Solutions",
    description: "Futuristic recruitment consultancy connecting elite minds with progressive enterprises PAN India.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen relative selection:bg-neon-blue selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
