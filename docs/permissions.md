# ULTRA permissions and execution model

- `storage`: store local preferences and enabled mini-tools.
- `activeTab`: temporary access to the active tab after a user gesture.
- `scripting`: inject the console after a direct user action and execute commands in the current tab's MAIN world.
- `contextMenus`: provide a shortcut to open ULTRA.

## Console security boundary

The console executes code typed by the user in the inspected page context, like browser developer tools. That code has the same origin permissions as the page and can read or modify that page's DOM and web storage. Do not paste code you do not trust. The extension does not execute remote scripts, request all-sites host access, or transmit page data.

The browser still prevents extensions from freely controlling the operating system, other applications, browser-internal pages, protected tabs, or cross-origin data. Use browser APIs only where the browser exposes them and the user has granted the relevant permission.

## DevTools panel

The ULTRA DevTools panel uses `chrome.devtools.inspectedWindow` for page evaluation and `chrome.devtools.network.getHAR` for network request metadata. Network capture is browser-provided and may require reloading the inspected page after opening DevTools.
