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
    icon: "/logo-dark.png",
    shortcut: "/logo-dark.png",
    apple: "/logo-dark.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var proto = window;
                  while (proto && !Object.getOwnPropertyDescriptor(proto, 'fetch')) {
                    proto = Object.getPrototypeOf(proto);
                  }
                  if (proto) {
                    var desc = Object.getOwnPropertyDescriptor(proto, 'fetch');
                    if (desc && desc.get && !desc.set) {
                      var origFetch = desc.get.call(window);
                      Object.defineProperty(window, 'fetch', {
                        get: function() { return origFetch; },
                        set: function(v) { origFetch = v; },
                        configurable: true,
                        enumerable: true
                      });
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <CookieProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <CookieConsent />
            <CookiePreferencesModal />
            <ConsentScriptLoader />
          </CookieProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
