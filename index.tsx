/*
 * VenDeafen, a Vencord plugin that fake deafens you in voice channels
 * Copyright (c) 2026 Anasdh
 *
 *see README.md for credits.
 */

import ErrorBoundary from "@components/ErrorBoundary";
import definePlugin from "@utils/types";
import { findByProps, findComponentByCodeLazy } from "@webpack";

import { AuthorCard } from "./about";
import { VenDeafenIcon } from "./icon";
import Settings from "./settings";
import { syncVoiceList } from "./voiceList";

const LOG = "[VenDeafen]";
const Button = findComponentByCodeLazy(".GREEN,positionKeyStemOverride:");

let enabled = false;
let originalSend: any;
let patchedSocket: any;

function refreshVoiceState() {
    const ChannelStore = findByProps("getChannel", "getDMFromUserId");
    const SelectedChannelStore = findByProps("getVoiceChannelId");
    const wsModule = findByProps("getSocket");

    if (!wsModule) return console.error(`${LOG} WebSocket gateway not found`);
    if (!SelectedChannelStore) return console.error(`${LOG} SelectedChannelStore not found`);

    const socket = wsModule.getSocket();
    const channelId = SelectedChannelStore.getVoiceChannelId();
    if (!socket || !channelId) return;

    const channel = ChannelStore?.getChannel(channelId);
    const MediaEngineStore = findByProps("isDeaf", "isMute");

    try {
        // op 4 = voice state update
        socket.send(4, {
            guild_id: channel?.guild_id ?? null,
            channel_id: channelId,
            self_mute:
                (enabled && Settings.store.fakeMute) || (MediaEngineStore?.isMute() ?? false),
            self_deaf:
                (enabled && Settings.store.fakeDeafen) || (MediaEngineStore?.isDeaf() ?? false),
            self_video: false,
            flags: 0,
        });
    } catch (error) {
        console.error(`${LOG} failed to update the voice state:`, error);
    }
}

function toggleEnabled() {
    enabled = !enabled;
    refreshVoiceState();
    syncVoiceList(enabled);
}

function handleKeyDown(event: KeyboardEvent) {
    if (Settings.store.enableKeybind && event.ctrlKey && event.shiftKey && event.code === "KeyQ") {
        event.preventDefault();
        toggleEnabled();
    }
}

function icon() {
    return <VenDeafenIcon enabled={enabled} />;
}

function VenDeafenButton(props: { nameplate?: any }) {
    return (
        <Button
            tooltipText={enabled ? "Disable VenDeafen" : "Enable VenDeafen"}
            icon={icon}
            role="switch"
            aria-checked={enabled}
            redGlow={enabled}
            plated={props?.nameplate != null}
            onClick={toggleEnabled}
        />
    );
}

export default definePlugin({
    name: "VenDeafen",
    description: "Fake deafen and mute yourself: others see you deafened, you still hear and talk",
    authors: [{ name: "Anasdh", id: 618227435745312768n }],
    settings: Settings,
    settingsAboutComponent: AuthorCard,

    start() {
        const socket = findByProps("getSocket")?.getSocket();
        if (!socket) return console.error(`${LOG} gateway socket not found`);

        originalSend = socket.send;
        patchedSocket = socket;
        // every voice state update Discord sends is rewritten while VenDeafen is on
        socket.send = function (op: number, data: any, ...args: any[]) {
            if (op === 4 && enabled && data) {
                if (Settings.store.fakeMute) data.self_mute = true;
                if (Settings.store.fakeDeafen) data.self_deaf = true;
            }
            return originalSend.apply(this, [op, data, ...args]);
        };
        window.addEventListener("keydown", handleKeyDown);
    },

    stop() {
        enabled = false;
        syncVoiceList(false);
        if (patchedSocket && originalSend) patchedSocket.send = originalSend;
        patchedSocket = originalSend = undefined;
        window.removeEventListener("keydown", handleKeyDown);
        refreshVoiceState();
    },

    patches: [
        {
            find: "#{intl::USER_PROFILE_ACCOUNT_POPOUT_BUTTON_A11Y_LABEL}",
            predicate: () => Settings.store.showButton,
            replacement: {
                match: /children:\[(?=[^}]*accountContainerRef)/,
                replace: "children:[$self.VenDeafenButton(arguments[0]),",
            },
        },
    ],

    VenDeafenButton: ErrorBoundary.wrap(VenDeafenButton, { noop: true }),
});
