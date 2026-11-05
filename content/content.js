/* ULTRA Console — injected in the extension isolated world. User code runs in MAIN world on explicit Run. */
(() => {
  const existing = document.getElementById("ultra-root");
  if (existing) { existing.remove(); return; }
  const root = document.createElement("div"); root.id = "ultra-root";
  const win = document.createElement("section"); win.className = "ultra-window";
  const header = document.createElement("header");
  const brand = document.createElement("strong"); brand.textContent = "ULTRA / CONSOLE";
  const hint = document.createElement("span"); hint.textContent = "PAGE CONTEXT";
  const minimize = document.createElement("button"); minimize.textContent = "—";
  const close = document.createElement("button"); close.textContent = "×";
  header.append(brand, hint, minimize, close);
  const toolbar = document.createElement("nav");
  [["Console","console"],["Elements","elements"],["Storage","storage"],["Help","help"]].forEach(([label,id]) => { const b=document.createElement("button");b.textContent=label;b.dataset.tab=id;b.addEventListener("click",()=>showTab(id));toolbar.append(b); });
  const output = document.createElement("div"); output.className = "ultra-output"; output.setAttribute("aria-live","polite");
  const form = document.createElement("form"); const prompt = document.createElement("span"); prompt.textContent="›";
  const input = document.createElement("textarea"); input.rows=2; input.spellcheck=false; input.placeholder="Run JavaScript in the page context… (Shift+Enter for newline)";
  const run = document.createElement("button"); run.textContent="Run";
  form.append(prompt,input,run);
  const footer = document.createElement("footer"); const pageInfo=document.createElement("span"); pageInfo.textContent=location.hostname; const status=document.createElement("span");status.textContent="Ready · isolated UI / page execution";
  footer.append(pageInfo,status); win.append(header,toolbar,output,form,footer); root.append(win); document.documentElement.append(root);
  let history=[], historyIndex=0, activeTab="console";
  function line(value,kind="log"){const row=document.createElement("pre");row.className="ultra-line "+kind;row.textContent=String(value);output.append(row);output.scrollTop=output.scrollHeight;}
  function showTab(tab){activeTab=tab;output.replaceChildren();toolbar.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
    if(tab==="help") line("ULTRA Console commands are JavaScript. Helpers: $(selector), $$(selector), $x(xpath), inspect(element), copy(value), clear().\nExamples:\n  document.title\n  $$('a').map(a => a.href)\n  localStorage.length\n  performance.getEntriesByType('resource').map(x => x.name)\nUse the DevTools ULTRA panel for network HAR and browser-native inspection.", "info");
    else if(tab==="elements") line("DOM helpers: $('css') selects one element; $$('.items') selects many; $x('//h1') runs XPath; inspect($('h1')) scrolls to and highlights an element. Try document.documentElement.outerHTML.", "info");
    else if(tab==="storage"){try{line({localStorage:Object.keys(localStorage).map(k=>({key:k,value:localStorage.getItem(k)})),sessionStorage:Object.keys(sessionStorage).map(k=>({key:k,value:sessionStorage.getItem(k)}))},"info");}catch(e){line(e.message,"error");}}
    else line("Console ready. JavaScript executes in the current page's MAIN world after you press Run. Commands are not sent to a server.","info");
  }
  async function execute(code){if(!code.trim())return;line("› "+code,"command");history.push(code);historyIndex=history.length;status.textContent="Running…";
    try{const result=await chrome.runtime.sendMessage({type:"ULTRA_EVAL",code});if(result?.ok)line(result.result,"result");else line(result?.error||"Execution failed","error");}
    catch(error){line(error.message,"error");}status.textContent="Ready";
  }
  form.addEventListener("submit",e=>{e.preventDefault();const code=input.value;input.value="";execute(code);});
  input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();form.requestSubmit();}else if(e.key==="ArrowUp"&&input.selectionStart===0){e.preventDefault();historyIndex=Math.max(0,historyIndex-1);input.value=history[historyIndex]||"";}else if(e.key==="ArrowDown"&&input.selectionStart===input.value.length){e.preventDefault();historyIndex=Math.min(history.length,historyIndex+1);input.value=history[historyIndex]||"";}});
  minimize.addEventListener("click",()=>{win.classList.toggle("minimized");minimize.textContent=win.classList.contains("minimized")?"+":"—";});
  close.addEventListener("click",()=>root.remove());showTab("console");input.focus();
})();