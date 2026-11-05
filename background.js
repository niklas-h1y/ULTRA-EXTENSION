/* ULTRA service worker: privileged extension operations stay here. */
const defaults = { enabledTools: ["console", "encoder", "page-lab", "reader", "focus"], theme: "midnight" };
chrome.runtime.onInstalled.addListener(async () => {
  const saved = await chrome.storage.local.get(defaults);
  await chrome.storage.local.set({ ...defaults, ...saved });
  try { chrome.contextMenus.create({ id: "ultra-open", title: "Open ULTRA", contexts: ["page"] }); } catch (_) {}
});
chrome.runtime.onMessage.addListener((message, sender, reply) => {
  if (message?.type === "ULTRA_STATE") { chrome.storage.local.get(defaults).then(reply); return true; }
  if (message?.type === "ULTRA_TOOL") {
    chrome.storage.local.get({ enabledTools: defaults.enabledTools }).then(async state => {
      const set = new Set(state.enabledTools); message.enabled ? set.add(message.id) : set.delete(message.id);
      const enabledTools = [...set]; await chrome.storage.local.set({ enabledTools }); reply({ enabledTools });
    }); return true;
  }
  if (message?.type === "ULTRA_EVAL") {
    const tabId = sender.tab?.id;
    if (!tabId || typeof message.code !== "string" || message.code.length > 100000) { reply({ ok: false, error: "No active tab or command too large." }); return false; }
    chrome.scripting.executeScript({
      target: { tabId }, world: "MAIN",
      func: async (source) => {
        try {
          const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
          const result = await new AsyncFunction("$", "$$", "$x", "inspect", "copy", "clear", source)(
            (selector, root=document) => root.querySelector(selector),
            (selector, root=document) => [...root.querySelectorAll(selector)],
            (xpath) => { const result=document.evaluate(xpath,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); return Array.from({length:result.snapshotLength},(_,i)=>result.snapshotItem(i)); },
            (element) => { if(element instanceof Element){element.scrollIntoView({block:"center"});element.style.outline="3px solid #8ba7ff";setTimeout(()=>element.style.outline="",1800);} return element; },
            (value) => navigator.clipboard?.writeText(typeof value==="string"?value:JSON.stringify(value)),
            () => console.clear()
          );
          let formatted;
          try { formatted = result === undefined ? "undefined" : JSON.stringify(result, (key,value) => value instanceof Element ? value.outerHTML.slice(0,500) : value, 2); }
          catch (_) { formatted = String(result); }
          return { ok: true, result: formatted ?? String(result) };
        } catch (error) { return { ok: false, error: error?.stack || String(error) }; }
      },
      args: [message.code]
    }).then(results => reply(results?.[0]?.result ?? { ok: false, error: "No result returned." }))
      .catch(error => reply({ ok: false, error: error.message }));
    return true;
  }
  if (message?.type === "ULTRA_PING") { reply({ ok: true }); return false; }
});
