/*
 * VenDeafen, a Vencord plugin that fake deafens you in voice channels
 * Copyright (c) 2026 Anasdh
 *
 *see README.md for credits.
 */
import { findByProps } from "@webpack";
import { FluxDispatcher, UserStore } from "@webpack/common";

import Settings from "./settings";

/**
 * Shows the fake state on your own row in the voice channel list.
 *
 * Only a normal voice state update for your own user is dispatched, nothing is wrapped or
 * replaced, and Discord's mute / deafen buttons (which read the local media engine) are left
 * alone. The update is repeated once after a short delay in case the gateway echo of your
 * own voice state arrives afterwards and overwrites it.
 */

const LOG = "[VenDeafen]";
const REPEAT_MS = [400, 1500];

let timers: ReturnType<typeof setTimeout>[] = [];

function dispatchOwnState(enabled: boolean) {
    try {
        const me = UserStore.getCurrentUser()?.id;
        const VoiceStateStore = findByProps("getVoiceStateForUser", "getVoiceStatesForChannel");
        const MediaEngineStore = findByProps("isDeaf", "isMute");
        const state = me && VoiceStateStore?.getVoiceStateForUser(me);
        if (!state) return;

        const fake = enabled && Settings.store.showInVoiceList;
        const realDeaf = MediaEngineStore?.isSelfDeaf?.() ?? MediaEngineStore?.isDeaf?.() ?? false;
        const realMute = MediaEngineStore?.isSelfMute?.() ?? MediaEngineStore?.isMute?.() ?? false;

        FluxDispatcher.dispatch({
            type: "VOICE_STATE_UPDATES",
            voiceStates: [
                {
                    ...state,
                    selfDeaf: fake && Settings.store.fakeDeafen ? true : realDeaf,
                    selfMute:
                        fake && (Settings.store.fakeMute || Settings.store.fakeDeafen)
                            ? true
                            : realMute,
                },
            ],
        });
    } catch (error) {
        console.error(`${LOG} could not update your row in the voice list:`, error);
    }
}

export function syncVoiceList(enabled: boolean) {
    timers.forEach(clearTimeout);
    dispatchOwnState(enabled);
    timers = REPEAT_MS.map((ms) => setTimeout(() => dispatchOwnState(enabled), ms));
}
