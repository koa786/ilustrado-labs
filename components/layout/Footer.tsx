"use client";

import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function Footer() {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <footer className="border-t border-border/40 bg-muted/5 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold gradient-text mb-4 block">
              Ilustrado Labs
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              The ultimate developer tools platform. 20+ browser-based utilities to speed up your workflow.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/tools" className="hover:text-primary transition-colors">All Tools</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-primary transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/text-diff-checker" className="hover:text-primary transition-colors">Diff Checker</Link></li>
              <li><Link href="/tools/password-generator" className="hover:text-primary transition-colors">Password Generator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li>
                <button 
                  onClick={openPreferencesModal} 
                  className="hover:text-primary transition-colors cursor-pointer text-left focus:outline-none focus:underline"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Ilustrado Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
