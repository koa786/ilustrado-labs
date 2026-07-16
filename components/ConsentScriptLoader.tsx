"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function ConsentScriptLoader() {
  const { consent } = useCookieConsent();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Only load optional tracking if user has given analytics consent
  const shouldLoad = consent.analytics && consent.consentGiven;

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FTNLFLNKDN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FTNLFLNKDN');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xn4cfx2azd");
        `}
      </Script>
    </>
  );
}
