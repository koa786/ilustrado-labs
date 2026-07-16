"use client";

import { useCookieConsentContext } from "@/context/CookieContext";

export function useCookieConsent() {
  const {
    consent,
    isBannerVisible,
    isModalOpen,
    acceptAll,
    rejectOptional,
    savePreferences,
    resetConsent,
    openPreferencesModal,
    closePreferencesModal,
  } = useCookieConsentContext();

  return {
    // Current consent state (necessary, analytics, functional, marketing, consentGiven, timestamp)
    consent,
    
    // Visibility states
    isBannerVisible,
    isModalOpen,
    
    // Actions
    acceptAll,
    rejectOptional,
    savePreferences,
    resetConsent,
    openPreferencesModal,
    closePreferencesModal,
    
    // Quick helper getter
    getConsent: () => consent,
  };
}
