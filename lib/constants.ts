/**
 * Application-wide constants
 */

export const EXAMPLE_GOALS = [
    "I want to pivot into Product Management in Climate Tech",
    "I'm looking to connect with AI researchers and ML engineers",
    "I need to find startup founders in the healthcare space",
    "I want to network with VCs and investors in fintech",
] as const

/**
 * Typing animation speed constants (in milliseconds)
 */
export const TYPING_SPEED = {
    /** Delay between typing each character */
    TYPE: 40,
    /** Delay between deleting each character */
    DELETE: 24,
    /** Delay before starting to delete after completing a goal */
    PAUSE: 800,
} as const

