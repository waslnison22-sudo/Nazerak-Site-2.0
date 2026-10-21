const BASE_PATH = location.hostname.endsWith("github.io") ? "/Nazerak-Site-2.0" : "";
const SERVER_IP = "nazehard.rustix.cc";
const DISCORD_URL = "https://discord.gg/2KvsYYDHN6";
const root = document.querySelector("#main");
const nav = document.querySelector("#primary-nav");
const menuToggle = document.querySelector(".menu-toggle");
const toast = document.querySelector("#toast");
document.querySelector("#year").textContent = String(new Date().getFullYear());
const knownRoutes = ["/", "/search", "/privacy"];
let toastTimer;
function showToast(message) {
  toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function routeInfo() {
  const url = new URL(location.href);
  const rawPath = url.pathname;
  const path = (BASE_PATH && rawPath.startsWith(BASE_PATH) ? rawPath.slice(BASE_PATH.length) : rawPath).replace(/\/+$/, "") || "/";
  if (knownRoutes.includes(path)) return {name:path === "/" ? "home" : path.slice(1), path, search:url.searchParams};
  return {name:"notfound",path};
}
function applyBasePathLinks(){
 if(!BASE_PATH) return;
 document.querySelectorAll('a[href^="/"]').forEach(link=>{
  const href=link.getAttribute("href");
  if(href && href!==BASE_PATH && !href.startsWith(BASE_PATH+"/")) link.setAttribute("href",BASE_PATH+href);
 });
}
function heading(kicker,title,description) {
  return "<header class='page-heading'><p class='section-kicker'>"+kicker+"</p><h1>"+title+"</h1>"+(description?"<p>"+description+"</p>":"")+"</header>";
}
const categories = [
  ["pravila-i-dokumenty","Информация и правила","Правила проекта, объявления и важные документы."],
  ["gosudarstvo-i-organizacii","Государство и организации","Государственные органы, ведомства и игровые организации."],
  ["igrovoi-mir","Игровой мир","Истории персонажей, игровые события и мир NaZerak."],
  ["obrashcheniya-i-podderzhka","Обращения и поддержка","Вопросы, обращения и помощь сообщества."],
  ["proekt-i-razvitie","Проект и развитие","Предложения, обновления и развитие проекта."],
  ["soobshchestvo","Сообщество","Общение игроков и темы вне основных разделов."]
];
function homePage() {
 return `
 <section class="hero hero--autumn" aria-labelledby="hero-title">
   <div class="hero-image" aria-hidden="true"></div><div class="hero-grain" aria-hidden="true"></div>
   <div class="container hero-inner">
     <div class="hero-content" data-reveal>
       <p class="eyebrow"><span class="eyebrow-dot"></span> MINECRAFT · ROLEPLAY · COMMUNITY</p>
       <h1 id="hero-title">Мир, в котором<br><em>начинается твоё.</em></h1>
       <p class="hero-copy">NaZerak — больше, чем игровой сервер. Это мир характеров, организаций и историй, которые создаются вместе с тобой.</p>
       <div class="hero-actions"><a class="button button-primary" href="#connect" data-scroll-connect>Войти в мир <span aria-hidden="true">↗</span></a><a class="button button-glass" href="#about" data-scroll-about>Открыть NaZerak <span aria-hidden="true">↓</span></a></div>
       <div class="hero-meta"><span class="meta-mark"></span><span>Minecraft Java Edition</span><i></i><span>Версия 1.21.11</span></div>
     </div>
     <div class="hero-side-note" data-reveal data-reveal-delay="180"><span class="side-note-line"></span><span>ТВОЯ ИСТОРИЯ<br>НАЧИНАЕТСЯ ЗДЕСЬ</span><span class="side-note-index">N / 01</span></div>
   </div>
   <a class="scroll-cue" href="#about" data-scroll-about aria-label="Прокрутить к разделу о проекте"><span></span><small>ЛИСТАЙ НИЖЕ</small></a>
 </section>
 <section class="intro-section section" id="about"><div class="container">
   <div class="intro-top" data-reveal><p class="section-kicker">01 / ФИЛОСОФИЯ ПРОЕКТА</p><p class="intro-aside">Не просто заходи в игру.<br><strong>Стань частью мира.</strong></p></div>
   <div class="intro-head" data-reveal><h2>Каждый выбор<br>оставляет <em>след.</em></h2><p>Здесь мир не заканчивается за пределами твоего дома. Он живёт в людях, событиях, решениях и историях, которые игроки создают вместе.</p></div>
   <div class="feature-grid feature-grid--editorial">
     <article class="feature-card feature-card--lead" data-reveal><span class="feature-number">01 <i>— ИСТОРИЯ</i></span><div class="feature-icon feature-icon--story" aria-hidden="true">↗</div><h3>Твоя роль.<br>Твои решения.</h3><p>Создай персонажа, найди своё место и преврати обычные игровые дни в историю, которую захочется продолжить.</p><span class="card-index">N / 01</span></article>
     <article class="feature-card feature-card--org" data-reveal data-reveal-delay="100"><span class="feature-number">02 <i>— СИСТЕМА</i></span><div class="feature-icon feature-icon--org" aria-hidden="true">⌘</div><h3>Организации<br>и государство.</h3><p>Участвуй в жизни организаций, строй связи и влияй на развитие общего мира.</p><span class="card-index">N / 02</span></article>
     <article class="feature-card feature-card--community" data-reveal data-reveal-delay="200"><span class="feature-number">03 <i>— ЛЮДИ</i></span><div class="feature-icon feature-icon--community" aria-hidden="true">◎</div><h3>Мир создают<br>люди.</h3><p>Знакомься, объединяйся и создавай совместные истории с сообществом NaZerak.</p><span class="card-index">N / 03</span></article>
   </div>
 </div></section>
 <section class="world-section" aria-label="Мир NaZerak"><div class="world-backdrop" aria-hidden="true"></div><div class="container world-inner" data-reveal><p class="section-kicker">02 / ТВОЯ ГЛАВА</p><h2>У этого мира<br>нет готового <em>сценария.</em></h2><p>Он пишется поступками игроков. Начни с малого — и однажды именно твоя история станет частью NaZerak.</p><a class="text-link" href="#connect" data-scroll-connect>Начать свою историю <span aria-hidden="true">↗</span></a><div class="world-coordinate">45° 02′ N&nbsp;&nbsp; / &nbsp;&nbsp;N·ZK</div></div></section>
 <section class="connect-section section" id="connect"><div class="container"><div class="connect-heading" data-reveal><p class="section-kicker">03 / ПЕРВЫЙ ШАГ</p><h2>Твой путь в NaZerak<br><em>начинается здесь.</em></h2><p>Подключайся к миру, выбирай свой путь и пиши историю вместе с другими игроками.</p></div>
   <div class="server-panel server-panel--premium" data-reveal><div class="server-panel-main"><div class="server-label"><span class="server-live-dot"></span> ПОДКЛЮЧЕНИЕ К СЕРВЕРУ</div><h3>Встречаемся<br>в игровом мире.</h3><p>Minecraft Java Edition <span>·</span> 1.21.11</p><div class="server-address"><code>${SERVER_IP}</code><button class="button button-primary copy-button" type="button" data-copy-ip aria-label="Скопировать IP сервера">Копировать IP <span aria-hidden="true">↗</span></button></div></div>
     <div class="connect-actions"><div class="connect-option"><span class="option-number">01</span><div><strong>Свой лаунчер</strong><small>Скоро появится</small></div><button class="option-arrow" type="button" data-stub="Собственный лаунчер NaZerak появится позже" aria-label="Информация о лаунчере">↗</button></div><a class="connect-option" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer"><span class="option-number">02</span><div><strong>Discord-сообщество</strong><small>Новости и общение</small></div><span class="option-arrow" aria-hidden="true">↗</span></a></div>
   </div><p class="connect-footnote" data-reveal>NAZERAK — СОЗДАЁМ МИР ВМЕСТЕ <span>·</span> ОФИЦИАЛЬНЫЙ САЙТ ПРОЕКТА</p></div></section>`;
}

function searchPage(initial) {
 return "<div class='page-shell'>"+heading("ПОИСК","Найти на NaZerak","Поиск по форуму, темам и публичным профилям.")+"<form class='search-bar' id='site-search'><input class='search-input' name='q' type='search' placeholder='Что ищем?' value='"+escapeHTML(initial)+"' aria-label='Поисковый запрос'><button class='button button-primary' type='submit'>Найти</button></form><div class='empty-state'><strong>Поиск подключается</strong><p>Поле работает, но результаты не придумываются и небезопасные запросы к базе не выполняются.</p></div></div>";
}
function privacyPage(){return "<div class='page-shell'>"+heading("ДОКУМЕНТЫ","Конфиденциальность","Информация о данных и аккаунтах.")+"<div class='panel'><h2>Текущий статус</h2><p>Это временная информационная страница, а не завершённый юридический документ.</p><p>Планируется использовать существующий Supabase Auth с Discord. Сайт не должен раскрывать токены, OAuth-коды, приватные поля профиля или данные модерации.</p><p>Вопросы по проекту: <a class='inline-link' href='"+DISCORD_URL+"' target='_blank' rel='noopener noreferrer'>официальный Discord ↗</a>.</p></div></div>";}
function notFoundPage(){return "<div class='page-shell'><div class='empty-state'><strong>Страница не найдена</strong><p>Проверь адрес или вернись на главную NaZerak.</p><p style='margin-top:18px'><a class='button button-primary' href='/' data-route='/'>На главную</a></p></div></div>";}
function render(){
 const r=routeInfo(); let html;
 switch(r.name){
 case "home":html=homePage();break;case "search":html=searchPage(r.search.get("q")||"");break;case "privacy":html=privacyPage();break;default:html=notFoundPage();
 }
 root.innerHTML=html;
 applyBasePathLinks();
 nav.querySelectorAll("[data-route]").forEach(link=>{const href=link.getAttribute("data-route");const active=href===r.path||(r.name==="category"&&href==="/forum")||(r.name==="topic"&&href==="/forum");if(active)link.setAttribute("aria-current","page");else link.removeAttribute("aria-current");});
 nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");
 const form=document.querySelector("#site-search");
 if(form)form.addEventListener("submit",event=>{event.preventDefault();const q=new FormData(form).get("q").toString().trim();const url=new URL(BASE_PATH+"/search",location.origin);if(q)url.searchParams.set("q",q);history.pushState({},"",url);render();});
}
document.addEventListener("click",async event=>{
 const link=event.target.closest("a[data-route]");
 if(link&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&event.button===0){event.preventDefault();history.pushState({},"",link.getAttribute("href"));render();window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});return;}
 if(event.target.closest("[data-copy-ip]")){try{await navigator.clipboard.writeText(SERVER_IP);showToast("IP сервера скопирован");}catch{const field=document.createElement("textarea");field.value=SERVER_IP;field.setAttribute("aria-label","IP сервера");field.style.position="fixed";field.style.opacity="0";document.body.append(field);field.select();const ok=document.execCommand("copy");field.remove();showToast(ok?"IP сервера скопирован":"Скопируй IP вручную: "+SERVER_IP);}}
 if(event.target.closest("[data-scroll-connect]")){const section=document.querySelector("#connect");if(section){event.preventDefault();section.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}}
  if(event.target.closest("[data-stub]")){event.preventDefault();showToast(event.target.closest("[data-stub]").getAttribute("data-stub")||"Эта функция появится позже");return;}
  if(event.target.closest("[data-scroll-about]")){const section=document.querySelector("#about");if(section){event.preventDefault();section.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}else{event.preventDefault();location.href=BASE_PATH+"/#about";}}
});
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menuToggle.setAttribute("aria-expanded",String(open));});
window.addEventListener("popstate",render);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&nav.classList.contains("is-open")){nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");menuToggle.focus();}});
render();