const clock = document.querySelector("#clock");
function tick(){ clock.textContent = new Intl.DateTimeFormat(undefined,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date()); }
tick(); setInterval(tick,1000);
