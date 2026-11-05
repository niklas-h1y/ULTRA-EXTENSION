const theme = document.querySelector("#theme");
const compact = document.querySelector("#compact");
const confirmEffects = document.querySelector("#confirm");
const status = document.querySelector("#save-status");
chrome.storage.local.get({ theme: "midnight", compact: false, confirmEffects: true }).then(values => { theme.value = values.theme; compact.checked = values.compact; confirmEffects.checked = values.confirmEffects; });
async function save(){ await chrome.storage.local.set({ theme: theme.value, compact: compact.checked, confirmEffects: confirmEffects.checked }); status.textContent = "Saved locally."; }
[theme, compact, confirmEffects].forEach(control => control.addEventListener("change", save));
