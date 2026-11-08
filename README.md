<p align="center">
  <img src=".assets/banner.svg" width="100%" alt="VenDeafen"/>
</p>

<p align="center">
  <strong>Look deafened, keep listening.</strong><br/>
  A <a href="https://github.com/Vendicated/Vencord">Vencord</a> plugin that makes you appear muted and deafened to everyone in a voice channel while you still hear and talk normally.
</p>

<p align="center">
  <img src=".assets/badges/vencord.svg" alt="Vencord userplugin"/>
  <img src=".assets/badges/typescript.svg" alt="TypeScript"/>
</p>

---

## ✨ Features

| | |
|---|---|
| 🎧 **Fake deafen and mute** | Others see the deafened and muted icons next to your name. Your audio is untouched. |
| 🪞 **Shows on your side too** | Your own row in the voice channel list shows you muted and deafened, so you can always tell it is on. Can be turned off. |
| 🔘 **One-click button** | A headphones button in the account area. Only this button turns red (with a dashed slash) while active, Discord's own mute and deafen buttons stay as they are. |
| ⌨️ **Keybind** | `Ctrl` + `Shift` + `Q` toggles it from anywhere. |
| 🎚️ **Pick what to fake** | Fake only the deafen, only the mute, or both. |
| 🧹 **Clean shutdown** | Disabling the plugin restores Discord's real state and removes every hook. |

## 🚀 Usage

1. Join a voice channel.
2. Click the **VenDeafen** button next to your avatar, or press `Ctrl+Shift+Q`.
3. Everyone else now sees you as deafened and muted. Click again to go back to normal.

## ⚙️ Settings

| Setting | Default | What it does |
|---|:---:|---|
| Fake mute | On | Appear muted to others while VenDeafen is on |
| Fake deafen | On | Appear deafened to others while VenDeafen is on |
| Show in voice list | On | Also show the fake state on your own row in the voice channel list |
| Show button | On | Shows the button in the account area (restart needed) |
| Enable keybind | On | Toggle with `Ctrl+Shift+Q` |

## 📦 Installation

VenDeafen is a userplugin, so Vencord has to be built from source ([official guide](https://docs.vencord.dev/installing/custom-plugins/)).

```bash
cd path/to/Vencord/src/userplugins
git clone https://github.com/Anaaasdh/VenDeafen.git

cd ../..            # back to the Vencord root
pnpm build
```

Restart Discord (`Ctrl+R`) and enable **VenDeafen** under `Settings → Vencord → Plugins`.

## 🔬 How it works

Discord tells everyone your voice state with a gateway message (opcode 4: `self_mute`, `self_deaf`). VenDeafen wraps the gateway `send` function and rewrites that message while it is on, so the server and other users see the fake state. Audio is handled separately by the local media engine, which is not touched, so you keep hearing and speaking. Your own Discord mute and deafen buttons are not changed either. For the voice channel list, the plugin dispatches a normal voice state update for your own user, so your row shows the fake state while the buttons stay real.

## 🩺 Troubleshooting

<details>
<summary><strong>My row in the voice list does not change</strong></summary>

Make sure **Show in voice list** is on and that you are in a voice channel. This part depends on how Discord renders the list, so after a Discord update it may stop working; the fake state for other people is not affected.
</details>

<details>
<summary><strong>The button does not appear</strong></summary>

Discord changes its interface often and the button can fail to attach. Use the keybind `Ctrl+Shift+Q` instead, and check that **Show button** is on in the plugin settings.
</details>

## 🙏 Credits

VenDeafen is based on [Vencord-FakeDeafen](https://github.com/hyyven) by **hyyven**, which in turn credits [yofukashino](https://github.com/yofukashino) and [SiriusBYT](https://github.com/SiriusBYT) for the original idea on another Discord client.

## 👤 Author

<table>
  <tr>
    <td align="center" width="140">
      <a href="https://github.com/Anaaasdh"><img src="https://github.com/Anaaasdh.png?size=160" width="88" height="88" alt="Anasdh"/></a>
    </td>
    <td>
      <strong>Anasdh</strong><br/>
      <a href="https://github.com/Anaaasdh"><img src=".assets/badges/github.svg" alt="GitHub"/></a>
      <a href="https://discord.com/users/618227435745312768"><img src=".assets/badges/discord.svg" alt="Discord"/></a>
    </td>
  </tr>
</table>

> [!WARNING]
> Modifying the Discord client can go against Discord's Terms of Service. Use it at your own risk.

<sub>Copyright (c) 2026 Anasdh. Based on Vencord-FakeDeafen by hyyven.</sub>
