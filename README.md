# ULTRA EXTENSION

**Your browser. Your tools. Your rules.** ULTRA is a modular Manifest V3 browser toolbox with a built-in developer console, page effects, encoders, and a mini-extension hub.

## Included
- **ULTRA Console:** an in-page developer console with page logs, DOM inspection, safe commands, and clearable history.
- **Page Lab:** reversible visual effects and reading styles.
- **Text Encoder:** local Base64 and URL encoding/decoding.
- **Extension Hub:** searchable, scrollable mini-tools users can enable or disable.
- **Popup, new-tab dashboard, settings, and DevTools panel** with a shared dark interface.
- Local preferences stored with `chrome.storage.local`.

## Install
1. Open `chrome://extensions` (Chrome, Edge, Brave) or `about:debugging#/runtime/this-firefox` (Firefox).
2. Enable developer mode and choose **Load unpacked** / **Load Temporary Add-on**.
3. Select this repository folder.
4. Open the toolbar popup and choose **Open Workspace**.

## Permissions & privacy
ULTRA does not request access to every website at install time. Page tools use `activeTab` and `scripting` after a user action. No page content is transmitted or collected. Encoders operate locally; visual effects can be undone. The console intentionally disables arbitrary JavaScript evaluation.

## Project map
- `background.js`: service worker and local tool state.
- `content/`: user-invoked page console.
- `popup/`: compact launcher.
- `sidepanel/`: searchable extension hub, encoders, and page lab.
- `newtab/`: ULTRA dashboard.
- `options/`: preferences and safety controls.
- `devtools/`: dedicated DevTools panel.
- `lib/`: shared module guidance.
- `locales/`: English extension metadata.

## Development
Run `npm run check` with Node.js 18+ to syntax-check JavaScript. The extension has no runtime dependencies. Chromium-specific features may vary by browser; Firefox support should be verified on the target release before publishing.
