const root=document.documentElement;
const systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
const motionBox=document.querySelector('#motion-off');
let manualReduced=false,pace=1,themeBusy=false;
const reduced=()=>systemMotion.matches||manualReduced;
root.classList.add('js-motion');
const themeButton=document.querySelector('.theme-toggle');
function syncTheme(){const light=root.dataset.theme==='light';themeButton.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');themeButton.title=light?'Switch to dark mode':'Switch to light mode';themeButton.querySelector('svg').innerHTML=light?'<path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/>':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';drawContours();}
function changeTheme(){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('vxl-theme',root.dataset.theme)}catch{}syncTheme()}
themeButton.addEventListener('click',async()=>{if(themeBusy)return;if(reduced()){changeTheme();return}if(!document.startViewTransition){themeBusy=true;const b=themeButton.getBoundingClientRect(),x=b.x+b.width/2,y=b.y+b.height/2,r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));const wipe=document.createElement('div');wipe.className='theme-wipe';wipe.style.background=root.dataset.theme==='dark'?'#f3f3f0':'#080d13';document.body.append(wipe);try{await wipe.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${r}px at ${x}px ${y}px)`]},{duration:650*pace,easing:'cubic-bezier(.65,0,.15,1)',fill:'forwards'}).finished;changeTheme();await wipe.animate({opacity:[1,0]},{duration:180,fill:'forwards'}).finished}finally{wipe.remove();themeBusy=false}return}themeBusy=true;const b=themeButton.getBoundingClientRect();const x=b.x+b.width/2,y=b.y+b.height/2;const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));try{const t=document.startViewTransition(changeTheme);await t.ready;const a=root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},{duration:850*pace,easing:'cubic-bezier(.65,0,.15,1)',pseudoElement:'::view-transition-new(root)'});await a.finished;await t.finished}catch{if(!root.dataset.theme)root.dataset.theme='dark'}finally{themeBusy=false}});
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu')}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
matchMedia('(min-width:641px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>revealObserver.observe(e));
const counters=[...document.querySelectorAll('[data-count]')];
let countGeneration=0;
function finalCount(el){el.textContent=Number(el.dataset.count).toLocaleString('en-US',{minimumFractionDigits:Number(el.dataset.decimals||0),maximumFractionDigits:Number(el.dataset.decimals||0)})}
function animateCount(el){if(el.dataset.done)return;el.dataset.done='true';if(reduced()){finalCount(el);return}const gen=countGeneration,start=performance.now(),duration=1700*pace,value=Number(el.dataset.count),decimals=Number(el.dataset.decimals||0);function frame(now){if(gen!==countGeneration)return;if(reduced()){finalCount(el);return}const p=Math.min(1,(now-start)/duration),n=value*(1-Math.pow(1-p,3));el.textContent=n.toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});if(p<1)requestAnimationFrame(frame);else finalCount(el)}requestAnimationFrame(frame)}
const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)animateCount(e.target)}),{threshold:.8});counters.forEach(e=>countObserver.observe(e));
const header=document.querySelector('header'),progress=document.querySelector('.reading-progress');
let scrollQueued=false;
function updateScroll(){header.classList.toggle('scrolled',scrollY>30);const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;updateHomepageMotion();scrollQueued=false}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll)}},{passive:true});
const canvas=document.querySelector('#contours'),ctx=canvas.getContext('2d');let cw=0,ch=0,time=0,lastFrame=0,canvasVisible=true,animationId;
function sizeCanvas(){const b=canvas.getBoundingClientRect();cw=b.width;ch=b.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=cw*dpr;canvas.height=ch*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);drawContours()}
function drawContours(){if(!ctx||!cw)return;ctx.clearRect(0,0,cw,ch);const light=root.dataset.theme==='light';const t=reduced()?0:time;for(let ring=0;ring<22;ring++){ctx.beginPath();for(let step=0;step<=150;step++){const angle=step/150*Math.PI*2;const ripple=Math.sin(angle*3+t*.17)*28+Math.cos(angle*5-t*.1)*12;const rx=cw*.19+ring*26+ripple,ry=ch*.23+ring*23+ripple;const driftX=reduced()?0:Math.sin(t*.15)*35;const x=cw*.73+driftX+Math.cos(angle)*rx+Math.sin(angle*2+t*.1)*65;const y=ch*.53+Math.sin(angle)*ry;step?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.strokeStyle=light?`rgba(31,111,179,${.1+(ring%4)*.018})`:`rgba(70,158,220,${.13+(ring%4)*.022})`;ctx.lineWidth=.65;ctx.stroke()}}
function loop(now){animationId=undefined;if(reduced()||!canvasVisible||document.hidden||innerWidth<641)return;if(now-lastFrame>32){time+=.032/pace;drawContours();lastFrame=now}animationId=requestAnimationFrame(loop)}
function resumeCanvas(){if(animationId)cancelAnimationFrame(animationId);animationId=undefined;drawContours();if(!reduced()&&canvasVisible&&!document.hidden&&innerWidth>=641)animationId=requestAnimationFrame(loop)}
new ResizeObserver(()=>{sizeCanvas();resumeCanvas()}).observe(canvas);
new IntersectionObserver(([e])=>{canvasVisible=e.isIntersecting;resumeCanvas()}).observe(canvas);
document.addEventListener('visibilitychange',resumeCanvas);
const ring=document.querySelector('.cursor-ring');let mx=0,my=0,px=0,py=0,pointerFrame,hasPointer=false;
function pointerLoop(){px+=(mx-px)*.18;py+=(my-py)*.18;ring.style.left=px+'px';ring.style.top=py+'px';if(Math.abs(px-mx)+Math.abs(py-my)>.1)pointerFrame=requestAnimationFrame(pointerLoop);else pointerFrame=undefined}
addEventListener('pointermove',e=>{if(!finePointer.matches||reduced())return;mx=e.clientX;my=e.clientY;if(!hasPointer){px=mx;py=my;hasPointer=true}ring.classList.add('active');ring.classList.toggle('hover',!!e.target.closest('a,button,input'));if(!pointerFrame)pointerFrame=requestAnimationFrame(pointerLoop)},{passive:true});
document.addEventListener('pointerleave',()=>{ring.classList.remove('active');hasPointer=false});
const panel=document.querySelector('#preview-panel'),previewButton=document.querySelector('.preview-toggle');
function setPanel(open){panel.hidden=!open;previewButton.setAttribute('aria-expanded',String(open));previewButton.querySelector('span').textContent=open?'−':'＋'}
previewButton.addEventListener('click',()=>setPanel(panel.hidden));document.querySelector('#close-preview').addEventListener('click',()=>{setPanel(false);previewButton.focus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!panel.hidden){setPanel(false);previewButton.focus()}if(nav.classList.contains('open')){closeMenu();menuButton.focus()}}});
function applyMotion(){root.dataset.motion=reduced()?'off':'on';motionBox.checked=reduced();motionBox.disabled=systemMotion.matches;motionBox.title=systemMotion.matches?'Reduced motion is enabled in your system preferences':'';if(reduced()){countGeneration++;counters.forEach(finalCount);ring.classList.remove('active');introBrandAnimation?.finish()}resumeCanvas();syncHomepageMotion();updateHomepageMotion()}
motionBox.addEventListener('change',()=>{manualReduced=motionBox.checked;applyMotion()});systemMotion.addEventListener('change',applyMotion);
document.querySelector('#pace').addEventListener('input',e=>{pace=Number(e.target.value);root.style.setProperty('--pace',pace);document.querySelector('#pace-label').textContent=pace<1?'Snappy':pace>1?'Unhurried':'Balanced'});
document.querySelector('#replay').addEventListener('click',()=>{countGeneration++;counters.forEach(e=>{delete e.dataset.done;finalCount(e);countObserver.unobserve(e);countObserver.observe(e)});document.querySelectorAll('.reveal').forEach(e=>{e.classList.remove('visible');revealObserver.unobserve(e);revealObserver.observe(e)});document.querySelectorAll('.line>span').forEach(e=>{e.style.animation='none';void e.offsetWidth;e.style.animation=''});window.scrollTo({top:0,behavior:'instant'});time=0;drawContours();setPanel(false);themeButton.focus({preventScroll:true})});
// Homepage video and scroll choreography. No scrolling library or remote runtime.
const hero=document.querySelector('.hero'),heroVideo=document.querySelector('#hero-video');
const motionControl=document.querySelector('.motion-control');
const intro=document.querySelector('.intro'),story=document.querySelector('.project-story');
const founderPhoto=document.querySelector('.founder-photo'),footerWordmark=document.querySelector('.footer-wordmark');
const letters=[...document.querySelectorAll('.vxl-letter')];
const introCopy=document.querySelector('.intro-copy');
// Split only text nodes; retain the original emphasis and accessible reading order.
function wrapWords(node){[...node.childNodes].forEach(child=>{if(child.nodeType===Node.TEXT_NODE){const frag=document.createDocumentFragment();child.textContent.split(/(\s+)/).forEach(word=>{if(!word)return;if(/\s/.test(word)){frag.append(document.createTextNode(word))}else{const span=document.createElement('span');span.className='story-word';span.textContent=word;frag.append(span)}});child.replaceWith(frag)}else if(child.nodeType===Node.ELEMENT_NODE){wrapWords(child)}})}
wrapWords(introCopy);
const words=[...introCopy.querySelectorAll('.story-word')];
const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
let filmVisible=false,videoLoaded=false,autoplayBlocked=false,customBackgroundURL=null,backgroundKind='video',userApprovedPlayback=false;
const backgroundFile=document.querySelector('#background-file'),uploadBackground=document.querySelector('#upload-background'),resetBackground=document.querySelector('#reset-background'),backgroundStatus=document.querySelector('#background-status'),heroGif=document.querySelector('#hero-gif');
const featureVideo=document.querySelector('#feature-video');
document.querySelector('.hero-build-controls').append(previewButton);
function updateMotionControl(){const stopped=reduced()||autoplayBlocked;motionControl.disabled=systemMotion.matches;motionControl.setAttribute('aria-pressed',String(reduced()));motionControl.innerHTML=systemMotion.matches?'Motion reduced':stopped?'Play motion <span aria-hidden="true">▷</span>':'Pause motion <span aria-hidden="true">Ⅱ</span>';}
function syncHomepageMotion(){
 const stopped=reduced()||!filmVisible||document.hidden;
 if(backgroundKind==='gif'){heroGif.hidden=stopped;heroVideo.classList.toggle('is-gif',!stopped);heroVideo.pause();updateMotionControl();return}
 heroGif.hidden=true;heroVideo.classList.remove('is-gif');
 if(stopped){heroVideo.pause();updateMotionControl();return}
 if(navigator.connection?.saveData&&!userApprovedPlayback&&!videoLoaded){autoplayBlocked=true;updateMotionControl();return}
 if(!videoLoaded){const source=heroVideo.querySelector('source');source.src=source.dataset.src;videoLoaded=true;heroVideo.load()}
 heroVideo.playbackRate=1/pace;
 heroVideo.play().then(()=>{autoplayBlocked=false;updateMotionControl()}).catch(()=>{autoplayBlocked=true;updateMotionControl()});updateMotionControl();
}
new IntersectionObserver(([entry])=>{filmVisible=entry.isIntersecting;syncHomepageMotion()},{threshold:.15}).observe(hero);
new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)featureVideo.pause()},{threshold:.1}).observe(featureVideo);
document.addEventListener('visibilitychange',()=>{syncHomepageMotion();if(document.hidden)featureVideo.pause()});
motionControl.addEventListener('click',()=>{if(systemMotion.matches)return;userApprovedPlayback=true;if(autoplayBlocked){autoplayBlocked=false;manualReduced=false}else{manualReduced=!manualReduced}applyMotion()});
document.querySelector('#pace').addEventListener('input',()=>{heroVideo.playbackRate=1/pace});
// Build-time background choices stay in this browser across page refreshes and preview updates.
function openBackgroundDB(){return new Promise((resolve,reject)=>{const request=indexedDB.open('vxl-build-backgrounds',1);request.onupgradeneeded=()=>request.result.createObjectStore('media');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function backgroundStore(action,value){const db=await openBackgroundDB();return new Promise((resolve,reject)=>{const tx=db.transaction('media',action==='get'?'readonly':'readwrite'),store=tx.objectStore('media');const request=action==='get'?store.get('hero'):action==='delete'?store.delete('hero'):store.put(value,'hero');let result;request.onsuccess=()=>{result=request.result};tx.oncomplete=()=>{db.close();resolve(result)};tx.onerror=()=>{db.close();reject(tx.error)};tx.onabort=()=>{db.close();reject(tx.error||new Error('Storage unavailable'))}})}
function checkBackground(file,url){return new Promise((resolve,reject)=>{const gif=file.type==='image/gif'||/\.gif$/i.test(file.name),probe=gif?new Image():document.createElement('video');let done=false;const timer=setTimeout(()=>finish(new Error('The file could not be loaded. Try an MP4, WebM or GIF.')),12000);function finish(error){if(done)return;done=true;clearTimeout(timer);if(!gif){probe.removeAttribute('src');probe.load()}error?reject(error):resolve(gif?'gif':'video')};if(gif){probe.onload=()=>finish();probe.onerror=()=>finish(new Error('This GIF could not be opened.'))}else{probe.preload='metadata';probe.onloadedmetadata=()=>probe.videoWidth>0?finish():finish(new Error('Choose a video with a supported video track.'));probe.onerror=()=>finish(new Error('This video format could not be played. Try an MP4 or WebM.'))}probe.src=url})}
function setBackground(file,url,kind){heroVideo.pause();if(customBackgroundURL)URL.revokeObjectURL(customBackgroundURL);customBackgroundURL=url;backgroundKind=kind;autoplayBlocked=false;userApprovedPlayback=true;
 if(kind==='gif'){heroVideo.removeAttribute('src');heroVideo.querySelector('source').removeAttribute('src');heroVideo.load();heroGif.src=url;videoLoaded=false}else{heroGif.removeAttribute('src');heroVideo.querySelector('source').removeAttribute('src');heroVideo.src=url;videoLoaded=true;heroVideo.load()}
 resetBackground.hidden=false;syncHomepageMotion();
}
uploadBackground.addEventListener('click',()=>backgroundFile.click());
backgroundFile.addEventListener('change',async()=>{const file=backgroundFile.files?.[0];if(!file)return;uploadBackground.disabled=true;let url=null;try{
 if(file.size>150*1024*1024)throw new Error('Choose a background smaller than 150 MB.');if(!/^video\//.test(file.type)&&file.type!=='image/gif'&&!/\.(mp4|webm|mov|gif)$/i.test(file.name))throw new Error('Choose an MP4, WebM or GIF.');
 backgroundStatus.textContent='Loading background…';url=URL.createObjectURL(file);const kind=await checkBackground(file,url);setBackground(file,url,kind);url=null;
 try{await backgroundStore('put',{file,name:file.name,kind});backgroundStatus.textContent='Background saved in this browser.'}catch{backgroundStatus.textContent='Background changed. Browser storage is unavailable; it will reset on refresh.'}
 }catch(error){if(url)URL.revokeObjectURL(url);backgroundStatus.textContent=error.message}finally{uploadBackground.disabled=false;backgroundFile.value=''}});
resetBackground.addEventListener('click',async()=>{heroVideo.pause();heroGif.hidden=true;heroGif.removeAttribute('src');heroVideo.removeAttribute('src');heroVideo.querySelector('source').src=heroVideo.querySelector('source').dataset.src;if(customBackgroundURL)URL.revokeObjectURL(customBackgroundURL);customBackgroundURL=null;backgroundKind='video';videoLoaded=true;heroVideo.load();resetBackground.hidden=true;autoplayBlocked=false;syncHomepageMotion();try{await backgroundStore('delete');backgroundStatus.textContent='Original background restored.'}catch{backgroundStatus.textContent='Original background restored for this visit. Browser storage could not be cleared.'}});
backgroundStore('get').then(async record=>{if(!record?.file)return;const url=URL.createObjectURL(record.file);try{const kind=await checkBackground(record.file,url);setBackground(record.file,url,kind);backgroundStatus.textContent='Your saved background is loaded.'}catch{URL.revokeObjectURL(url);backgroundStatus.textContent='Saved background could not be played. Upload another video.'}}).catch(()=>{});
function updateHomepageMotion(){
 if(reduced()||innerWidth<641){root.style.setProperty('--hero-shift','0px');root.style.setProperty('--hero-scale','1');words.forEach(w=>w.style.setProperty('--word-lit','1'));return}
 const heroP=clamp(-hero.getBoundingClientRect().top/innerHeight);
 root.style.setProperty('--hero-shift',`${heroP*-65}px`);root.style.setProperty('--hero-scale',String(1-heroP*.065));
 const ib=intro.getBoundingClientRect(),ip=clamp((innerHeight*.88-ib.top)/(innerHeight*.9));
 letters.forEach((letter,i)=>{const p=clamp(ip*1.7-i*.22);letter.style.setProperty('--letter-opacity',String(.15+p*.85));letter.style.setProperty('--letter-y',`${(1-p)*55}px`);letter.style.setProperty('--letter-rotate',`${(1-p)*18}deg`)});
 const copyB=introCopy.getBoundingClientRect(),wordP=clamp((innerHeight*.86-copyB.top)/(innerHeight*.5));words.forEach((w,i)=>w.style.setProperty('--word-lit',String(clamp(wordP*words.length-i))));
 const sb=story.getBoundingClientRect(),sp=clamp((92-sb.top)/Math.max(1,sb.height-innerHeight+110));
 root.style.setProperty('--story-progress',String(sp));root.style.setProperty('--story-scale',String(1.16-sp*.16));root.style.setProperty('--story-y',`${(sp-.5)*25}px`);root.style.setProperty('--story-radius',`${28-sp*28}px`);
 const fb=founderPhoto.getBoundingClientRect(),fp=clamp((innerHeight-fb.top)/(innerHeight+fb.height));founderPhoto.style.setProperty('--founder-scale',String(1.07-fp*.07));
 const foot=footerWordmark.getBoundingClientRect();footerWordmark.style.setProperty('--footer-y',`${clamp((innerHeight-foot.top)/innerHeight)*-20}px`);
}
addEventListener('resize',updateHomepageMotion,{passive:true});
sizeCanvas();syncTheme();applyMotion();updateScroll();


// Keep logo visible if scripts, loading, or an observer fail; animate only the artwork.
const introBrand=document.querySelector('.intro-logo'),introBrandArt=document.querySelector('.intro-logo-art');
var introBrandPlayed=false,introBrandAnimation;
const introBrandObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting&&!introBrandPlayed){introBrandPlayed=true;if(!reduced())introBrandAnimation=introBrandArt.animate([{opacity:0,transform:'translateY(18px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:1500,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});introBrandObserver.unobserve(introBrand)}}},{threshold:.2});
introBrandObserver.observe(introBrand);
systemMotion.addEventListener('change',()=>{if(reduced())introBrandAnimation?.finish()});
motionBox.addEventListener('change',()=>{if(reduced())introBrandAnimation?.finish()});
