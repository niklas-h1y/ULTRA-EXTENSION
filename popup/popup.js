const openTab = path => chrome.tabs.create({ url: chrome.runtime.getURL(path) });
async function launchPageTool(){ const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); if (!tab?.id) return; await chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["content/content.css"] }); await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content/content.js"] }); window.close(); }
document.querySelector("#console").addEventListener("click", launchPageTool);
document.querySelector("#workspace").addEventListener("click", () => openTab("sidepanel/index.html"));
document.querySelectorAll("[data-tool]").forEach(button => button.addEventListener("click", () => { if (button.dataset.tool === "encoder") openTab("sidepanel/index.html#encoder"); else if (button.dataset.tool === "page-lab") launchPageTool(); else openTab("sidepanel/index.html#reader"); }));
