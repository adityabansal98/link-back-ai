/**
 * Date formatting utilities
 */

/**
 * Formats a date string for display with time (e.g., "Last updated" timestamps)
 * @param dateString - ISO date string or null
 * @returns Formatted date string with time, or "Never" if null
 */
export function formatDate(dateString: string | null): string {
    if (!dateString) return "Never"
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    } catch {
        return dateString
    }
}

/**
 * Formats a connection date string for display (e.g., "Connected On" dates)
 * @param dateString - Date string from LinkedIn CSV
 * @returns Formatted date string without time, or empty string if invalid
 */
export function formatConnectionDate(dateString: string): string {
    if (!dateString) return ""
    try {
        // LinkedIn dates are typically in format "DD Mon YYYY" or similar
        // Try to parse and format it nicely
        const date = new Date(dateString)
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        }
        // If parsing fails, return the original string
        return dateString
    } catch {
        return dateString
    }
}

