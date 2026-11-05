/* ULTRA Manifest V3 service worker. */
const defaults = { enabledTools: ["console", "encoder", "page-lab", "reader", "focus"], theme: "midnight" };
chrome.runtime.onInstalled.addListener(async () => {
  const saved = await chrome.storage.local.get(defaults);
  await chrome.storage.local.set({ ...defaults, ...saved });
  try { chrome.contextMenus.create({ id: "ultra-open", title: "Open ULTRA", contexts: ["page"] }); } catch (_) {}
});
chrome.runtime.onMessage.addListener((message, sender, reply) => {
  if (message?.type === "ULTRA_STATE") { chrome.storage.local.get(defaults).then(reply); return true; }
  if (message?.type === "ULTRA_TOOL") { chrome.storage.local.get({ enabledTools: defaults.enabledTools }).then(async state => { const set = new Set(state.enabledTools); message.enabled ? set.add(message.id) : set.delete(message.id); const enabledTools = [...set]; await chrome.storage.local.set({ enabledTools }); reply({ enabledTools }); }); return true; }
  if (message?.type === "ULTRA_PING") { reply({ ok: true }); return false; }
});
