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
 return "<section class='hero'><div class='container hero-inner'><p class='eyebrow'>MINECRAFT · ROLEPLAY · COMMUNITY</p><h1>Свой мир.<br><em>Своя история.</em></h1><p class='hero-copy'>NaZerak — русскоязычный Minecraft-проект, где игроки создают собственные истории, развивают организации и меняют общий игровой мир.</p><div class='hero-actions'><a class='button button-primary' href='#connect' data-scroll-connect>Подключиться к серверу ↗</a><a class='button button-secondary' href='#about' data-scroll-about>О проекте →</a></div></div></section>"+
 "<section class='section' id='about'><div class='container'><div class='section-heading'><div><p class='section-kicker'>О НАС</p><h2>Больше, чем просто сервер.</h2></div><p>NaZerak — пространство для ролевых историй, организаций и решений, которые меняют общий игровой мир.</p></div><div class='feature-grid'>"+
 "<article class='feature-card'><span class='feature-number'>01</span><h3>Ролевая история</h3><p>Создавай персонажа, принимай решения и развивай свою историю в общем мире.</p></article>"+
 "<article class='feature-card'><span class='feature-number'>02</span><h3>Организации и государство</h3><p>Участвуй в работе организаций, общественной жизни и развитии игровых институтов.</p></article>"+
 "<article class='feature-card'><span class='feature-number'>03</span><h3>Сообщество</h3><p>Знакомься с игроками и создавай истории вместе с сообществом NaZerak.</p></article></div></div></section>"+
 "<section class='section' id='connect'><div class='container'><div class='server-panel'><div><p class='section-kicker'>ПОДКЛЮЧЕНИЕ</p><h2>Выбирай, как войти в NaZerak.</h2><p>Minecraft Java Edition · версия 1.21.11</p><div class='server-address'><code>"+SERVER_IP+"</code><button class='button button-secondary' type='button' data-copy-ip>Подключиться по IP · копировать</button></div></div><div class='connect-actions'><button class='button button-primary' type='button' data-stub='Собственный лаунчер NaZerak появится позже'>Собственный лаунчер · скоро</button><a class='button button-secondary' href='"+DISCORD_URL+"' target='_blank' rel='noopener noreferrer'>Официальный Discord ↗</a></div></div></div></section>";
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