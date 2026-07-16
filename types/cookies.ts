export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export interface CookieConsentState extends CookiePreferences {
  consentGiven: boolean;
  timestamp: string | null;
}

export interface CookieContextType {
  consent: CookieConsentState;
  isBannerVisible: boolean;
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (preferences: Omit<CookiePreferences, "necessary">) => void;
  resetConsent: () => void;
  openPreferencesModal: () => void;
  closePreferencesModal: () => void;
}
