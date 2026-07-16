"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CookieConsentState, CookieContextType, CookiePreferences } from "@/types/cookies";

const LOCAL_STORAGE_KEY = "ilustrado_cookie_consent";

const DEFAULT_CONSENT: CookieConsentState = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
  consentGiven: false,
  timestamp: null,
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsentState>(DEFAULT_CONSENT);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Example placeholder loader for Analytics
  const loadAnalyticsScripts = useCallback(() => {
    console.log("Analytics cookies allowed: Activating GA & Clarity tracking...");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("loadAnalytics"));
    }
  }, []);

  const unloadAnalyticsScripts = useCallback(() => {
    console.log("Analytics cookies rejected: Deactivating tracking...");
  }, []);

  // Example placeholder loader for Marketing
  const loadMarketingScripts = useCallback(() => {
    console.log("Marketing cookies allowed: Activating pixel tracking...");
  }, []);

  /**
   * Dispatches events or triggers script loading dynamically based on user consent.
   * This allows external scripts to be enabled/disabled without reloading the page.
   */
  const triggerConsentCallbacks = useCallback((currentConsent: CookieConsentState) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("cookieConsentChange", { detail: currentConsent });
      window.dispatchEvent(event);

      if (currentConsent.analytics) {
        loadAnalyticsScripts();
      } else {
        unloadAnalyticsScripts();
      }

      if (currentConsent.marketing) {
        loadMarketingScripts();
      }
    }
  }, [loadAnalyticsScripts, unloadAnalyticsScripts, loadMarketingScripts]);

  // Initialize consent state from localStorage on mount
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
      try {
        const storedConsent = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedConsent) {
          const parsedConsent = JSON.parse(storedConsent) as CookieConsentState;
          parsedConsent.necessary = true;
          setConsent(parsedConsent);
          triggerConsentCallbacks(parsedConsent);
        } else {
          setIsBannerVisible(true);
        }
      } catch (error) {
        console.error("Error reading cookie consent from localStorage:", error);
        setIsBannerVisible(true);
      }
    });
    return () => cancelAnimationFrame(handle);
  }, [triggerConsentCallbacks]);

  // Helper function to update and persist consent state
  const updateConsent = useCallback((newConsent: CookieConsentState) => {
    setConsent(newConsent);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConsent));
      triggerConsentCallbacks(newConsent);
    } catch (error) {
      console.error("Error saving cookie consent to localStorage:", error);
    }
  }, [triggerConsentCallbacks]);

  const acceptAll = useCallback(() => {
    const newConsent: CookieConsentState = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
      consentGiven: true,
      timestamp: new Date().toISOString(),
    };
    updateConsent(newConsent);
    setIsBannerVisible(false);
  }, [updateConsent]);

  const rejectOptional = useCallback(() => {
    const newConsent: CookieConsentState = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
      consentGiven: true,
      timestamp: new Date().toISOString(),
    };
    updateConsent(newConsent);
    setIsBannerVisible(false);
  }, [updateConsent]);

  const savePreferences = useCallback((preferences: Omit<CookiePreferences, "necessary">) => {
    const newConsent: CookieConsentState = {
      necessary: true,
      ...preferences,
      consentGiven: true,
      timestamp: new Date().toISOString(),
    };
    updateConsent(newConsent);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  }, [updateConsent]);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error("Error resetting cookie consent:", e);
    }
    setConsent(DEFAULT_CONSENT);
    setIsBannerVisible(true);
  }, []);

  const openPreferencesModal = useCallback(() => setIsModalOpen(true), []);
  const closePreferencesModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <CookieContext.Provider
      value={{
        consent,
        isBannerVisible: isMounted && isBannerVisible,
        isModalOpen: isMounted && isModalOpen,
        acceptAll,
        rejectOptional,
        savePreferences,
        resetConsent,
        openPreferencesModal,
        closePreferencesModal,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsentContext = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error("useCookieConsentContext must be used within a CookieProvider");
  }
  return context;
};
