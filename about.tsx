/*
 * VenDeafen, a Vencord plugin that fake deafens you in voice channels
 * Copyright (c) 2026 Anasdh
 *
 *see README.md for credits.
 */
import { React, UserStore, UserUtils } from "@webpack/common";

const AUTHOR_NAME = "Anasdh";
const AUTHOR_URL = "https://github.com/Anaaasdh";
// discord only loads images from its own hosts, so the avatar comes from its CDN
const AUTHOR_DISCORD_ID = "618227435745312768";

function Avatar() {
    const [src, setSrc] = React.useState<string | null>(null);

    React.useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const user =
                    UserStore.getUser(AUTHOR_DISCORD_ID) ??
                    (await UserUtils.getUser(AUTHOR_DISCORD_ID));
                const url = user?.getAvatarURL?.(undefined, 64, false);
                if (alive && url) setSrc(url);
            } catch {}
        })();
        return () => {
            alive = false;
        };
    }, []);

    if (!src) return null;
    return (
        <img
            src={src}
            alt={AUTHOR_NAME}
            width={24}
            height={24}
            style={{ borderRadius: "50%" }}
            onError={() => setSrc(null)}
        />
    );
}

/** "Made by" row at the top of the plugin settings, links to the author's GitHub page. */
export function AuthorCard() {
    return (
        <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                color: "var(--text-muted)",
                fontSize: "14px",
            }}
        >
            <Avatar />
            <span>
                Made by{" "}
                <span style={{ color: "var(--brand-experiment, #5865f2)", fontWeight: 600 }}>
                    {AUTHOR_NAME}
                </span>{" "}
                · GitHub
            </span>
        </a>
    );
}
