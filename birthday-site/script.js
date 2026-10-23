const EVENTS=[
  {id:'brunch',date:'10.31',time:'10:30',title:'来 nini 家 brunch'},
  {id:'phantom',date:'10.31',time:'14:00',title:'《歌剧魅影》'},
  {id:'halloween',date:'10.31',time:'19:00',title:'晚餐 + 万圣节出动',note:'Dress code：童话人物（最好有紫色或闪亮元素）'},
  {id:'library',date:'11.1',time:'11:00',title:'声音图书馆'},
  {id:'lunch',date:'11.1',time:'12:30',title:'午餐'},
  {id:'picnic',date:'11.1',time:'14:00',title:'杨浦大桥滨江绿地 picnic'}
];
const FRAGMENTS=[
  ['亲密关系','人对亲密关系的期待像是一个开关，开开合合，房间里的灯还是没有亮','⌁'],
  ['勇气','深秋飞拉达，IntoWild 带我去找条条大路通罗马的自由','↗'],
  ['家人','奶奶有很折磨的老人病，奶奶想去看东方明珠','♡'],
  ['社群','IntoWild 两周年，我们本该日日相逢','✳'],
  ['彼岸是什么','跨年轮渡，神奇的轮渡房间，少喝点吧！','≈'],
  ['人生忽如寄，莫负茶汤好心情','','☕'],
  ['朋友','','✦'],
  ['破碎','冲突与伤害','◇'],
  ['美丽的自然、究极美好的人类','林贾尼山顶是幸福感满溢的','☀'],
  ['你和海浪的起源','wave it easy 漂在海上的时候你在想什么','≈'],
  ['好好工作','却没有得偿所愿，你说过程更重要对吗？','⌂'],
  ['先玩再说','耍中找钱、找钱来耍、找耍结合、以耍为主','✿'],
  ['喜欢','我喜欢斯里兰卡的微笑，喜欢海边冲浪生活，喜欢极度丰富的大巴，喜欢收到贺卡，喜欢重新认可自己','♡'],
  ['许愿','building, building until you fund it out','✧']
];
const STORAGE_KEY='nini-birthday-demo-submissions-v1';
function readRecords(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch{return []}}
function saveRecord(record){const all=readRecords();all.push(record);localStorage.setItem(STORAGE_KEY,JSON.stringify(all))}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const selected=new Set();
const list=document.getElementById('event-list');
list.innerHTML=EVENTS.map(e=>`<button type="button" class="event" data-id="${e.id}" aria-pressed="false"><span class="event-check" aria-hidden="true"></span><span class="event-copy"><span class="event-time">${e.date} ${e.time}</span><span class="event-title">${escapeHtml(e.title)}</span>${e.note?`<span class="event-note">${escapeHtml(e.note)}</span>`:''}</span></button>`).join('');
list.addEventListener('click',event=>{const card=event.target.closest('.event');if(!card)return;const id=card.dataset.id;if(selected.has(id))selected.delete(id);else selected.add(id);card.classList.toggle('selected',selected.has(id));card.setAttribute('aria-pressed',String(selected.has(id)));document.getElementById('selected-count').textContent=`已选 ${selected.size} 场`});
const fragmentList=document.getElementById('fragment-list');
const fragmentImages={0:'fragment-room.webp',3:'fragment-intowild.webp'};
fragmentList.innerHTML=FRAGMENTS.map(([title,body,icon],i)=>`<article class="fragment"><span class="fragment-number">${String(i+1).padStart(2,'0')}</span><h3>${escapeHtml(title)}</h3><div class="fragment-visual" data-fragment="${String(i+1).padStart(2,'0')}">${fragmentImages[i]?`<img src="assets/${fragmentImages[i]}" alt="${escapeHtml(title)}的手绘插画" loading="lazy" />`:`<span class="sketch" aria-hidden="true">${icon}</span><span class="sketch-caption">${escapeHtml(title)}</span>`}</div>${body?`<p>${escapeHtml(body)}</p>`:''}</article>`).join('');
const cover=document.querySelector('.cover');document.getElementById('open-oyster').addEventListener('click',()=>{if(cover.classList.contains('open'))return;cover.classList.add('open');document.getElementById('cover-hint').textContent='欢迎来看看这一岁';setTimeout(()=>document.getElementById('prologue').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}),1850)});
const wish=document.getElementById('guest-wish'),count=document.getElementById('wish-count'),form=document.getElementById('wish-form'),status=document.getElementById('form-status'),nameInput=document.getElementById('guest-name');wish.addEventListener('input',()=>count.textContent=wish.value.length);
form.addEventListener('submit',e=>{e.preventDefault();status.textContent='';const name=nameInput.value.trim();if(!name){nameInput.setAttribute('aria-invalid','true');status.textContent='请先留下你的名字';nameInput.focus();return}nameInput.removeAttribute('aria-invalid');const record={name,events:[...selected],wish:wish.value.trim(),createdAt:new Date().toISOString()};try{saveRecord(record);form.hidden=true;const chosen=EVENTS.filter(e=>selected.has(e.id));document.getElementById('success-events').textContent=chosen.length?`期待在 ${chosen.map(e=>`${e.date} ${e.title}`).join('、')} 见到你。`:'也期待下次和你见面。';document.getElementById('success').hidden=false;document.getElementById('success').scrollIntoView({behavior:'smooth',block:'center'})}catch{status.textContent='没发出去，再试一次'}});
document.getElementById('reset-form').addEventListener('click',()=>{form.hidden=false;form.reset();count.textContent='0';document.getElementById('success').hidden=true;nameInput.focus()});
