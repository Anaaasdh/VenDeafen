/*
 * VenDeafen, a Vencord plugin that fake deafens you in voice channels
 * Copyright (c) 2026 Anasdh
 *
 *see README.md for credits.
 */

/** Headphones, red with a dashed slash while VenDeafen is on (dashed = "fake"). */
export function VenDeafenIcon({ enabled }: { enabled: boolean }) {
    const color = enabled ? "#ed4245" : "currentColor";

    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <rect
                x="3"
                y="13"
                width="4.5"
                height="7"
                rx="2"
                fill={enabled ? color : "none"}
                stroke={color}
                strokeWidth="2"
            />
            <rect
                x="16.5"
                y="13"
                width="4.5"
                height="7"
                rx="2"
                fill={enabled ? color : "none"}
                stroke={color}
                strokeWidth="2"
            />
            {enabled && (
                <line
                    x1="3.5"
                    y1="3.5"
                    x2="20.5"
                    y2="21"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="3 3"
                />
            )}
        </svg>
    );
}
