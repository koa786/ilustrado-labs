"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { X, Shield, Activity, Settings, BarChart3, HelpCircle } from "lucide-react";
import { CookieConsentState } from "@/types/cookies";

interface CookiePreferencesModalContentProps {
  consent: CookieConsentState;
  closePreferencesModal: () => void;
  savePreferences: (prefs: { analytics: boolean; functional: boolean; marketing: boolean }) => void;
  acceptAll: () => void;
}

function CookiePreferencesModalContent({
  consent,
  closePreferencesModal,
  savePreferences,
  acceptAll,
}: CookiePreferencesModalContentProps) {
  // Internal form state initialized from current context consent state directly on mount
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [functional, setFunctional] = useState(consent.functional);
  const [marketing, setMarketing] = useState(consent.marketing);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trapping, scrolling lock, focus retention on mount/unmount
  useEffect(() => {
    // Store currently focused element to restore it on close
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    // Focus the modal content for screen readers
    setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex="0"]'
        ) as HTMLElement;
        firstFocusable?.focus();
      }
    }, 50);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll and focus
      document.body.style.overflow = "unset";
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreferencesModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePreferencesModal]);

  // Trap focus inside modal
  const handleTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;

    if (e.key === "Tab") {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex="0"]'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab -> loop backwards
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab -> loop forwards
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  const handleSave = () => {
    savePreferences({
      analytics,
      functional,
      marketing,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onKeyDown={handleTabKey}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Background Overlay click */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={closePreferencesModal}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-2">
            <Shield className="text-primary w-5 h-5" />
            <h2 id="modal-title" className="text-xl font-bold tracking-tight">
              Cookie Preferences
            </h2>
          </div>
          <button
            onClick={closePreferencesModal}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-muted/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            aria-label="Close preferences modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          <p id="modal-description" className="text-sm text-muted leading-relaxed">
            We respect your right to privacy. Below, you can customize your preferences for the optional cookies we use on our website. Standard strictly necessary cookies cannot be disabled as they are required for basic site operations.
          </p>

          <div className="space-y-4">
            {/* 1. Necessary Cookies */}
            <div className="p-4 rounded-xl border border-border bg-muted/5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary self-start">
                <Settings size={20} />
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Necessary Cookies</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-primary/15 text-primary rounded-md">
                    Always Enabled
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  These cookies are essential for our website to function properly. They enable core security features, user authentication, page routing, and your selected preferences. They do not store any personal data.
                </p>
              </div>
            </div>

            {/* 2. Analytics Cookies */}
            <div className="p-4 rounded-xl border border-border hover:border-border/80 transition-colors bg-muted/5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent self-start">
                <BarChart3 size={20} />
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="toggle-analytics" className="font-semibold text-sm cursor-pointer">
                    Analytics Cookies
                  </label>
                  <div className="relative inline-flex items-center">
                    <input
                      id="toggle-analytics"
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  These cookies help us analyze how our visitors use the website. They track parameters like unique visits, traffic sources, page dwell times, and error rates so we can continuously measure and improve performance.
                </p>
              </div>
            </div>

            {/* 3. Functional Cookies */}
            <div className="p-4 rounded-xl border border-border hover:border-border/80 transition-colors bg-muted/5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 self-start">
                <Activity size={20} />
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="toggle-functional" className="font-semibold text-sm cursor-pointer">
                    Functional Cookies
                  </label>
                  <div className="relative inline-flex items-center">
                    <input
                      id="toggle-functional"
                      type="checkbox"
                      checked={functional}
                      onChange={(e) => setFunctional(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  These cookies allow us to offer enhanced personal features, such as custom theme persistence, code preferences, or caching specific browser configurations. They can be set by us or by third-party services.
                </p>
              </div>
            </div>

            {/* 4. Marketing Cookies */}
            <div className="p-4 rounded-xl border border-border hover:border-border/80 transition-colors bg-muted/5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-500 self-start">
                <HelpCircle size={20} />
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="toggle-marketing" className="font-semibold text-sm cursor-pointer">
                    Marketing Cookies
                  </label>
                  <div className="relative inline-flex items-center">
                    <input
                      id="toggle-marketing"
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  These cookies track your browsing behavior across other networks and websites. They are used to build a profile of your interest to deliver targeted marketing ads, newsletters, or campaigns relevant to your engineering needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={closePreferencesModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border hover:bg-muted/20 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            Cancel
          </button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              Save Preferences
            </button>
            <button
              onClick={acceptAll}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CookiePreferencesModal() {
  const {
    consent,
    isModalOpen,
    closePreferencesModal,
    savePreferences,
    acceptAll,
  } = useCookieConsent();

  if (!isModalOpen) {
    return null;
  }

  return (
    <CookiePreferencesModalContent
      consent={consent}
      closePreferencesModal={closePreferencesModal}
      savePreferences={savePreferences}
      acceptAll={acceptAll}
    />
  );
}
