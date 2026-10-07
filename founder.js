const root=document.documentElement,systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
const theme=document.querySelector('.theme-toggle'),menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav'),motion=document.querySelector('.founder-motion');
const heroFilm=document.querySelector('#garden-hero-video'),connection=navigator.connection;
let filmConsent=false,heroVisible=false,videoBlocked=false,playPending=false;
let paused=false,queued=false;const reduced=()=>paused||systemMotion.matches;
function syncTheme(){const light=root.dataset.theme==='light';theme.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');theme.title=theme.getAttribute('aria-label');theme.querySelector('svg').innerHTML=light?'<path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/>':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>'}
theme.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';try{localStorage.setItem('vxl-theme',root.dataset.theme)}catch{}syncTheme()});syncTheme();
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus()}});matchMedia('(min-width:641px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const animations=new Set();
const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;observer.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,easing:'cubic-bezier(.2,.7,.2,1)'});animations.add(a);a.onfinish=()=>animations.delete(a)}},{threshold:.12});document.querySelectorAll('[data-enter]').forEach(n=>observer.observe(n));
const landscape=document.querySelector('.founder-landscape'),timeline=document.querySelector('.founder-timeline'),progress=document.querySelector('.reading-progress');
function updateScroll(){queued=false;const height=root.scrollHeight-innerHeight;progress.style.width=`${height>0?scrollY/height*100:0}%`;if(reduced())return;const b=landscape?.getBoundingClientRect();if(b&&b.bottom>0&&b.top<innerHeight){const p=Math.max(0,Math.min(1,(innerHeight-b.top)/(innerHeight+b.height)));landscape.style.setProperty('--landscape-shift',`${-8+p*6}%`)}const t=timeline?.getBoundingClientRect();if(t)timeline.style.setProperty('--timeline-fill',`${Math.max(0,Math.min(100,(innerHeight*.65-t.top)/t.height*100))}%`)}
function schedule(){if(!queued){queued=true;requestAnimationFrame(updateScroll)}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
function applyMotion(){root.dataset.motion=reduced()?'off':'on';motion.setAttribute('aria-pressed',String(reduced()));motion.textContent=systemMotion.matches?'Reduced motion':paused?'Resume motion':'Pause motion';motion.disabled=systemMotion.matches;if(reduced()){animations.forEach(a=>a.finish());animations.clear()}schedule();syncHeroVideo()}
motion.addEventListener('click',()=>{if(heroFilm&&!paused&&((connection?.saveData&&!filmConsent)||videoBlocked)){filmConsent=true;videoBlocked=false}else{paused=!paused}applyMotion()});systemMotion.addEventListener('change',applyMotion);applyMotion();

// Decorative hero film: defer media loading until visible and allowed.
function heroMayPlay(){return heroFilm&&heroVisible&&!document.hidden&&!reduced()&&(!connection?.saveData||filmConsent)&&!videoBlocked}
function syncHeroVideo(){
 if(!heroFilm)return;
 motion.textContent=systemMotion.matches?'Reduced motion':paused?'Resume motion':(connection?.saveData&&!filmConsent)||videoBlocked?'Play background video':'Pause motion';
 if(!heroMayPlay()){heroFilm.pause();return}
 if(!heroFilm.getAttribute('src')){heroFilm.src=heroFilm.dataset.src;heroFilm.load()}
 if(playPending||!heroFilm.paused)return;
 playPending=true;
 heroFilm.play().catch(()=>{if(heroMayPlay()){videoBlocked=true;motion.textContent='Play background video'}}).finally(()=>{playPending=false;if(!heroMayPlay())heroFilm.pause()});
}
if(heroFilm){
 const heroObserver=new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.05;syncHeroVideo()},{threshold:[0,.05]});
 heroObserver.observe(heroFilm);
 document.addEventListener('visibilitychange',syncHeroVideo);
 connection?.addEventListener('change',syncHeroVideo);
 heroFilm.addEventListener('error',()=>{videoBlocked=true;syncHeroVideo()});
}

function revealSource(){if(location.hash.startsWith('#source-')){const source=document.querySelector('.garden-sources details');if(source)source.open=true;requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView())}}
document.querySelectorAll('.source-ref').forEach(a=>a.addEventListener('click',()=>{const source=document.querySelector('.garden-sources details');if(source)source.open=true}));
addEventListener('hashchange',revealSource);revealSource();

// Rotate only the two requested greetings, suspending while motion is paused or out of view.
(()=>{const greeting=document.querySelector('.contact-greeting-words');if(!greeting)return;let timer,visible=false;function syncGreeting(){clearInterval(timer);if(systemMotion.matches){greeting.dataset.language='en';return}if(reduced()||document.hidden||!visible)return;timer=setInterval(()=>{greeting.dataset.language=greeting.dataset.language==='zh'?'en':'zh'},4000)}new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncGreeting()}).observe(greeting);new MutationObserver(syncGreeting).observe(root,{attributes:true,attributeFilter:['data-motion']});document.addEventListener('visibilitychange',syncGreeting)})();

// Browsable month preview only: booking availability awaits a real scheduling account.
(()=>{const calendar=document.querySelector('.calendar-preview');if(!calendar)return;const today=new Date(),month=new Date(today.getFullYear(),today.getMonth(),1),label=calendar.querySelector('h3'),body=calendar.querySelector('tbody');function render(){label.textContent=month.toLocaleDateString('en-GB',{month:'long',year:'numeric'});body.replaceChildren();const offset=(month.getDay()+6)%7,days=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();for(let start=0;start<offset+days;start+=7){const row=document.createElement('tr');for(let col=0;col<7;col++){const cell=document.createElement('td'),day=start+col-offset+1;if(day>0&&day<=days){const text=document.createElement('span');text.textContent=day;if(day===today.getDate()&&month.getMonth()===today.getMonth()&&month.getFullYear()===today.getFullYear())text.setAttribute('aria-current','date');cell.append(text)}row.append(cell)}body.append(row)}}calendar.querySelector('.calendar-prev').addEventListener('click',()=>{month.setMonth(month.getMonth()-1);render()});calendar.querySelector('.calendar-next').addEventListener('click',()=>{month.setMonth(month.getMonth()+1);render()});render();calendar.hidden=false})();

// One short mountain reveal per page entry; native scrolling and header stay available.
(()=>{const opening=document.querySelector('.garden-opening');if(!opening||systemMotion.matches||connection?.saveData||location.hash||scrollY>80)return;const hero=opening.parentElement,content=hero.querySelector('.garden-hero-content'),skip=opening.querySelector('button');let done=false;opening.hidden=false;hero.classList.add('garden-intro-active');content.inert=true;const zoom=opening.querySelector('img').animate([{transform:'scale(1)'},{transform:'scale(1.07)'}],{duration:3400,easing:'ease-out',fill:'both'});const fade=opening.animate([{opacity:1,offset:0},{opacity:1,offset:.55},{opacity:0,offset:1}],{duration:3400,easing:'ease-in-out',fill:'both'});const title=content.animate([{opacity:0,offset:0},{opacity:0,offset:.6},{opacity:1,offset:1}],{duration:3400,easing:'ease-out',fill:'both'});function finish(){if(done)return;done=true;const focused=opening.contains(document.activeElement);opening.hidden=true;hero.classList.remove('garden-intro-active');content.inert=false;zoom.cancel();fade.cancel();title.cancel();if(focused)motion.focus({preventScroll:true});document.removeEventListener('visibilitychange',visibility);removeEventListener('scroll',scroll);systemMotion.removeEventListener('change',finish);connection?.removeEventListener('change',finish)}function visibility(){if(done)return;for(const a of [zoom,fade,title])document.hidden?a.pause():a.play()}function scroll(){if(scrollY>80)finish()}fade.onfinish=finish;skip.addEventListener('click',finish);opening.addEventListener('keydown',e=>{if(e.key==='Escape')finish()});document.addEventListener('visibilitychange',visibility);addEventListener('scroll',scroll,{passive:true});systemMotion.addEventListener('change',finish);connection?.addEventListener('change',finish);visibility()})();
