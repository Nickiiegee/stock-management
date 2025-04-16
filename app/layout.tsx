import HeaderAuth from "@/components/navbar/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import seatrenchLogo from "@/utils/assets/logo.png";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Providers from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col items-center">
            <Providers>
              <div className="flex-1 w-full flex flex-col">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 border-b-orange-500">
                  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center font-semibold">
                      <Image
                        src={seatrenchLogo}
                        alt="Logo"
                        width={160}
                        height={160}
                        className="mr-2"
                      />
                    </div>
                    <HeaderAuth />
                  </div>
                </nav>
                <div className="p-8">{children}</div>

                <footer className="w-full flex items-center justify-center border-t mx-auto text-xs gap-8 py-4 fixed bottom-0">
                  <p>
                    Powered by{" "}
                    <a
                      href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                      target="_blank"
                      className="font-bold hover:underline"
                      rel="noreferrer"
                    >
                      Supabase
                    </a>
                  </p>
                  {/* <ThemeSwitcher /> */}
                </footer>
              </div>
            </Providers>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
