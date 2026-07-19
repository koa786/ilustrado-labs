import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Inter } from "next/font/google";
import { CookieProvider } from "@/context/CookieContext";
import { CookieConsent } from "@/components/CookieConsent";
import { CookiePreferencesModal } from "@/components/CookiePreferencesModal";
import { ConsentScriptLoader } from "@/components/ConsentScriptLoader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "IlustradoLabs | Developer Tools Platform",
    template: "%s | IlustradoLabs",
  },
  description: "20+ free browser-based developer tools including JSON formatters, diff checkers, generators, and more.",
  icons: {
    icon: "/logo-light.png",
    shortcut: "/logo-light.png",
    apple: "/logo-light.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <CookieProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            
            {/* Cookie Consent UI Elements */}
            <CookieConsent />
            <CookiePreferencesModal />
            
            {/* Conditionally Load Analytics / Third-party scripts based on user consent */}
            <ConsentScriptLoader />
          </ThemeProvider>
        </CookieProvider>
      </body>
    </html>
  );
}
