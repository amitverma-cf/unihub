import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Logo from "@/components/ui/logo";
import Footer from "@/components/app/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen w-full flex flex-col items-center">

            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full flex justify-between items-center  px-4 py-4 md:px-6 lg:px-12 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Logo />
                </div>
                <div className="flex gap-5 items-center font-semibold">
                  <ThemeSwitcher />
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>

              </div>
            </nav>

            <div className="flex flex-col">
              {children}
            </div>

            <Footer />

          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
