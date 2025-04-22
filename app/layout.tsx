import Navbar from "@/components/navbar/navbar";
import { DashboardSidebar } from "@/components/navbar/sidebar";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Providers from "./providers";
import { MobileSidebar } from "@/components/navbar/mobile_sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Seatrench Stock Management",
  description: "Demo stock management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="h-screen bg-background hidden md:flex md:gap-2">
              <DashboardSidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                  {children}
                </main>
              </div>
            </div>
            <div className="md:gap-2 md:hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
              <MobileSidebar />
              {/* <Navbar /> */}
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
              </div>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
