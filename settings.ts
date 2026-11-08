/*
 * VenDeafen, a Vencord plugin that fake deafens you in voice channels
 * Copyright (c) 2026 Anasdh
 *
 * Based on Vencord-FakeDeafen by hyyven (https://github.com/hyyven), see README.md for credits.
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export default definePluginSettings({
    fakeMute: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Appear as muted to others while VenDeafen is on",
    },
    fakeDeafen: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Appear as deafened to others while VenDeafen is on",
    },
    showInVoiceList: {
        type: OptionType.BOOLEAN,
        default: true,
        description:
            "Show yourself as muted / deafened in the voice channel list. Discord's own mute and deafen buttons are not changed",
    },
    showButton: {
        type: OptionType.BOOLEAN,
        default: true,
        restartNeeded: true,
        description: "Show the VenDeafen button in the account area",
    },
    enableKeybind: {
        type: OptionType.BOOLEAN,
        default: true,
        description: "Toggle VenDeafen with Ctrl+Shift+Q",
    },
});
