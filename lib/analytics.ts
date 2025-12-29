// Google Analytics 4 event tracking utility

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        event_category?: string
        event_label?: string
        value?: number
        [key: string]: any
      }
    ) => void
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: {
    event_category?: string
    event_label?: string
    value?: number
    [key: string]: any
  }
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams)
  }
}

// Convenience functions for common events
export const trackPageView = (pagePath: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_path: pagePath,
    })
  }
}

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("button_click", {
    event_category: "engagement",
    event_label: buttonName,
    location: location || "unknown",
  })
}

export const trackFileUpload = (fileName: string) => {
  trackEvent("file_upload", {
    event_category: "user_action",
    event_label: fileName,
  })
}

export const trackSearch = (keywordCount: number) => {
  trackEvent("search", {
    event_category: "user_action",
    event_label: "find_connections",
    value: keywordCount,
  })
}

export const trackMessageGenerated = (connectionName: string) => {
  trackEvent("message_generated", {
    event_category: "user_action",
    event_label: connectionName,
  })
}

export const trackLinkedInClick = (type: "profile" | "message") => {
  trackEvent("linkedin_click", {
    event_category: "external_link",
    event_label: type,
  })
}

