# ULTRA EXTENSION

**Your browser. Your tools. Your rules.** ULTRA is a developer-first Manifest V3 toolbox. Its main feature is the ULTRA Console: a floating page-context JavaScript console plus a dedicated DevTools panel.

## Main feature: ULTRA Console
- Execute user-entered JavaScript in the current page's MAIN world, including async expressions.
- Capture `console.log/info/warn/error/debug` output from a command.
- Console command history, multiline input, clear/minimize/close controls.
- Helpers: `$(selector)`, `$$(selector)`, `$x(xpath)`, `inspect(element)`, `copy(value)`, `clear()`.
- Quick DOM, URL, storage and performance inspection.
- Dedicated DevTools panel with page evaluation, page metadata and Network HAR table.

## Other tools
- Page Lab: reversible visual effects and reading styles.
- Text Encoder: local Base64 and URL encoding/decoding.
- Extension Hub: searchable, scrollable mini-tools users can enable or disable.
- Popup, new-tab dashboard and local settings.

## Install
1. Open `chrome://extensions` (Chrome, Edge, Brave) or `about:debugging#/runtime/this-firefox` (Firefox).
2. Enable developer mode and choose **Load unpacked** / **Load Temporary Add-on**.
3. Select this repository folder.
4. Open the toolbar popup and choose **Open Console** or **Open Workspace**.

## Console safety and browser limits
ULTRA executes commands only after the user submits them. Page-context code has the same origin permissions as the inspected website; only run code you trust. The browser sandbox still blocks unrestricted OS control, other-app access, browser-internal pages and cross-origin data. Browser DevTools APIs are used where available; feature parity differs between browsers.

## Development
Run `npm run check` with Node.js 18+ to syntax-check JavaScript. No runtime dependencies or remote code are used.
