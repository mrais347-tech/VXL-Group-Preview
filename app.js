const root=document.documentElement;
const toggle=document.querySelector('.theme-toggle');
try{root.dataset.theme=localStorage.getItem('vxl-theme')||'dark'}catch{}
toggle.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('vxl-theme',root.dataset.theme)}catch{};draw()});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const c=document.querySelector('#contours'),ctx=c.getContext('2d');let t=0,w=0,h=0,id;const reduce=matchMedia('(prefers-reduced-motion:reduce)');
function resize(){const d=Math.min(devicePixelRatio||1,1.5);w=c.clientWidth;h=c.clientHeight;c.width=w*d;c.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw()}
function draw(){ctx.clearRect(0,0,w,h);const light=root.dataset.theme==='light';for(let r=0;r<24;r++){ctx.beginPath();for(let s=0;s<=160;s++){const a=s/160*Math.PI*2,ripple=Math.sin(a*3+t*.18)*28+Math.cos(a*5-t*.12)*14,rx=w*.18+r*27+ripple,ry=h*.21+r*23+ripple,x=w*.73+Math.cos(a)*rx+Math.sin(a*2+t*.08)*66,y=h*.52+Math.sin(a)*ry;s?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.strokeStyle=light?`rgba(25,100,155,${.10+(r%4)*.018})`:`rgba(90,178,235,${.14+(r%4)*.024})`;ctx.lineWidth=.7;ctx.stroke()}}
function loop(){if(!reduce.matches&&document.visibilityState==='visible'){t+=.018;draw()}id=requestAnimationFrame(loop)}
new ResizeObserver(resize).observe(c);resize();loop();
