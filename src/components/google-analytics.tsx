"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// This is a basic implementation of Google Analytics that tracks page views.
// For more advanced tracking, such as events, you would need to extend this.

declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      config?: { [key: string]: any }
    ) => void;
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const GoogleAnalytics = () => {
  const pathname = usePathname();

  // This effect ensures that a pageview is sent every time the path changes.
  useEffect(() => {
    if (GA_TRACKING_ID && typeof window.gtag === "function") {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
        }}
      />
    </>
  );
};
