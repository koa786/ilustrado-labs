"use client";

import React from "react";
import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { ShieldAlert, Cookie, Info } from "lucide-react";

export function CookieConsent() {
  const {
    isBannerVisible,
    acceptAll,
    rejectOptional,
    openPreferencesModal,
  } = useCookieConsent();

  // If the banner shouldn't be visible, do not render it
  if (!isBannerVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 left-0 right-0 z-[140] p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto bg-card/80 dark:bg-card/90 border border-border shadow-2xl rounded-2xl glass p-6 md:p-8 animate-in slide-in-from-bottom-5 duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Text & Icon Content */}
        <div className="flex-grow space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0">
              <Cookie size={20} className="animate-pulse" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">
              We value your privacy
            </h2>
          </div>
          
          <p className="text-sm text-muted leading-relaxed">
            We use cookies to improve your browsing experience, remember your preferences, and help us understand how our website is used. You can choose which optional cookies to allow.
          </p>
          
          {/* Quick Legal Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted font-medium">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              Privacy Policy
            </Link>
            <span className="text-border" aria-hidden="true">•</span>
            <Link
              href="/privacy-policy#cookie-policy"
              className="hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
            <span className="text-border" aria-hidden="true">•</span>
            <Link
              href="/about"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Info size={12} /> Learn More
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={openPreferencesModal}
            className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted/10 dark:hover:bg-muted/20 text-xs font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-center"
          >
            Customize Preferences
          </button>
          
          <button
            onClick={rejectOptional}
            className="px-4 py-2.5 rounded-xl border border-border bg-muted/5 hover:bg-muted/15 text-xs font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-center"
          >
            Reject Non-Essential
          </button>
          
          <button
            onClick={acceptAll}
            className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover text-xs font-bold tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-center"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
