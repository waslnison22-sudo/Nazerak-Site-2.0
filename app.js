const SERVER_IP = "nazehard.rustix.cc";
const DISCORD_URL = "https://discord.gg/2KvsYYDHN6";
const root = document.querySelector("#main");
const nav = document.querySelector("#primary-nav");
const menuToggle = document.querySelector(".menu-toggle");
const toast = document.querySelector("#toast");
document.querySelector("#year").textContent = String(new Date().getFullYear());
const knownRoutes = ["/", "/forum", "/members", "/search", "/cabinet", "/privacy", "/forum/reports"];
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
  const path = url.pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/forum/topic/")) return {name:"topic", id:decodeURIComponent(path.slice(12))};
  if (path.startsWith("/user/")) return {name:"user", id:decodeURIComponent(path.slice(6))};
  if (path.startsWith("/forum/") && path !== "/forum/reports") return {name:"category", slug:decodeURIComponent(path.slice(7))};
  if (knownRoutes.includes(path)) return {name:path === "/" ? "home" : path.slice(1), path, search:url.searchParams};
  return {name:"notfound",path};
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
 return "<section class='hero'><div class='container hero-inner'><p class='eyebrow'>MINECRAFT · ROLEPLAY · COMMUNITY</p><h1>Свой мир.<br><em>Своя история.</em></h1><p class='hero-copy'>NaZerak — русскоязычный Minecraft-проект, где игроки создают собственные истории, развивают организации и меняют общий игровой мир.</p><div class='hero-actions'><a class='button button-primary' href='#connect' data-scroll-connect>Подключиться к серверу ↗</a><a class='button button-secondary' href='/forum' data-route='/forum'>Перейти на форум →</a></div></div></section>"+
 "<section class='section'><div class='container'><div class='section-heading'><div><p class='section-kicker'>МИР NaZerak</p><h2>Больше, чем просто сервер.</h2></div><p>Мир живёт благодаря решениям игроков, организациям и историям, которые вы создаёте вместе.</p></div><div class='feature-grid'>"+
 "<article class='feature-card'><span class='feature-number'>01</span><h3>Ролевая история</h3><p>Создавай персонажа, принимай решения и развивай свою историю в общем мире.</p></article>"+
 "<article class='feature-card'><span class='feature-number'>02</span><h3>Организации и государство</h3><p>Участвуй в работе организаций, общественной жизни и развитии игровых институтов.</p></article>"+
 "<article class='feature-card'><span class='feature-number'>03</span><h3>Сообщество</h3><p>Знакомься с участниками, обсуждай идеи и следи за развитием проекта на форуме.</p></article></div></div></section>"+
 "<section class='section' id='connect'><div class='container'><div class='server-panel'><div><p class='section-kicker'>ПОДКЛЮЧЕНИЕ</p><h2>Твой следующий мир начинается здесь.</h2><p>Java Edition · Minecraft 1.21.11</p><div class='server-address'><code>"+SERVER_IP+"</code><button class='button button-secondary' type='button' data-copy-ip>Скопировать IP</button></div></div><a class='button button-primary' href='"+DISCORD_URL+"' target='_blank' rel='noopener noreferrer'>Официальный Discord ↗</a></div></div></section>"+
 "<section class='section'><div class='container'><div class='section-heading'><div><p class='section-kicker'>СООБЩЕСТВО</p><h2>Продолжи историю вне игры.</h2></div><p>Общайся, изучай разделы и следи за проектом.</p></div><div class='feature-grid'>"+
 "<a class='feature-card' href='/forum' data-route='/forum'><span class='feature-number'>↗</span><h3>Форум NaZerak</h3><p>Разделы проекта, обсуждения и публикации сообщества.</p></a>"+
 "<a class='feature-card' href='/members' data-route='/members'><span class='feature-number'>↗</span><h3>Участники</h3><p>Страница сообщества и публичные профили.</p></a>"+
 "<a class='feature-card' href='/cabinet' data-route='/cabinet'><span class='feature-number'>↗</span><h3>Личный кабинет</h3><p>Безопасный вход через существующую систему аккаунтов.</p></a></div></div></section>";
}
function forumPage() {
 const rows=categories.map((c,i)=>"<a class='forum-row' href='/forum/"+c[0]+"' data-route='/forum/"+c[0]+"'><div><h3>"+c[1]+"</h3><p>"+c[2]+"</p></div><span class='row-meta'>Раздел "+String(i+1).padStart(2,"0")+" →</span></a>").join("");
 return "<div class='page-shell'>"+heading("СООБЩЕСТВО","Форум NaZerak","Обсуждения, документы и жизнь игрового мира в одном месте.")+"<div class='notice' style='margin-bottom:20px'>Первая версия интерфейса. Живые темы, публикации и права доступа появятся после подключения проверенных Supabase-запросов. Демонстрационные темы не выдаются за реальные.</div><div class='page-grid'><section class='forum-list'>"+rows+"</section><aside class='panel'><h2>На форуме</h2><p>Шесть основных разделов — единая структура без искусственного деления на отдельные миры.</p><a class='inline-link' href='/forum/reports' data-route='/forum/reports'>Обращения и жалобы →</a><hr style='border:0;border-top:1px solid var(--line);margin:20px 0'><h2>Есть вопрос?</h2><p>Пока форумная база подключается, можно обратиться в официальный Discord.</p><a class='inline-link' href='"+DISCORD_URL+"' target='_blank' rel='noopener noreferrer'>Открыть Discord ↗</a></aside></div></div>";
}
function categoryPage(slug) {
 const c=categories.find(item=>item[0]===slug);
 if(!c) return notFoundPage();
 return "<div class='page-shell'><p class='section-kicker'><a href='/forum' data-route='/forum'>ФОРУМ</a> / РАЗДЕЛ</p><header class='page-heading'><h1>"+c[1]+"</h1><p>"+c[2]+"</p></header><div class='empty-state'><strong>Публикации пока не подключены</strong><p>Здесь будут отображаться реальные темы из существующей базы NaZerak. Мы не создаём фиктивные темы и не меняем базу автоматически.</p><p style='margin-top:18px'><a class='button button-secondary' href='/forum' data-route='/forum'>← Все разделы</a></p></div></div>";
}
function membersPage(){return "<div class='page-shell'>"+heading("СООБЩЕСТВО","Участники","Публичный каталог участников NaZerak.")+"<div class='empty-state'><strong>Каталог участников подключается</strong><p>Список появится после проверки таблиц публичных профилей и политик доступа Supabase. Приватные данные аккаунтов здесь отображаться не будут.</p></div></div>";}
function searchPage(initial) {
 return "<div class='page-shell'>"+heading("ПОИСК","Найти на NaZerak","Поиск по форуму, темам и публичным профилям.")+"<form class='search-bar' id='site-search'><input class='search-input' name='q' type='search' placeholder='Что ищем?' value='"+escapeHTML(initial)+"' aria-label='Поисковый запрос'><button class='button button-primary' type='submit'>Найти</button></form><div class='empty-state'><strong>Поиск подключается</strong><p>Поле работает, но результаты не придумываются и небезопасные запросы к базе не выполняются.</p></div></div>";
}
function cabinetPage(){return "<div class='page-shell'>"+heading("АККАУНТ","Личный кабинет","Единый аккаунт NaZerak с авторизацией через Discord.")+"<div class='page-grid'><section class='panel'><h2>Вход через Discord</h2><p>Вход должен использовать существующий проект Supabase и официальный callback. Перед включением OAuth нужно проверить allowlist redirect URL для нового сайта.</p><div class='notice'>Авторизация пока не запускается: live-настройки Supabase не проверены. Это предотвращает перенаправление OAuth на неправильный домен.</div><p style='margin-top:18px'><a class='button button-primary' href='"+DISCORD_URL+"' target='_blank' rel='noopener noreferrer'>Перейти в Discord ↗</a></p></section><aside class='panel'><h2>Сохранность аккаунтов</h2><p>Существующая база сохраняется. Новый сайт не создаёт Supabase-проект, не меняет схему и не сбрасывает данные.</p></aside></div></div>";}
function reportsPage(){return "<div class='page-shell'>"+heading("МОДЕРАЦИЯ","Обращения и жалобы","Защищённая зона модерации форума.")+"<div class='empty-state'><strong>Раздел появится после подключения авторизации</strong><p>Обращения и действия модераторов доступны только пользователям с подтверждёнными правами в базе данных.</p></div></div>";}
function topicPage(id){return "<div class='page-shell'><p class='section-kicker'><a href='/forum' data-route='/forum'>ФОРУМ</a> / ТЕМА</p><div class='empty-state'><strong>Тема "+escapeHTML(id)+" не загружена</strong><p>Контент будет загружаться из существующей базы после проверки структуры и RLS. ID темы выводится безопасно как текст.</p><p style='margin-top:18px'><a class='button button-secondary' href='/forum' data-route='/forum'>← Вернуться на форум</a></p></div></div>";}
function userPage(id){return "<div class='page-shell'><p class='section-kicker'><a href='/members' data-route='/members'>УЧАСТНИКИ</a> / ПРОФИЛЬ</p><div class='empty-state'><strong>Профиль "+escapeHTML(id)+" не загружен</strong><p>Публичные поля появятся после проверки схемы доступа. Приватные данные не выводятся.</p></div></div>";}
function privacyPage(){return "<div class='page-shell'>"+heading("ДОКУМЕНТЫ","Конфиденциальность","Информация о данных и аккаунтах.")+"<div class='panel'><h2>Текущий статус</h2><p>Это временная информационная страница, а не завершённый юридический документ.</p><p>Планируется использовать существующий Supabase Auth с Discord. Сайт не должен раскрывать токены, OAuth-коды, приватные поля профиля или данные модерации.</p><p>Вопросы по проекту: <a class='inline-link' href='"+DISCORD_URL+"' target='_blank' rel='noopener noreferrer'>официальный Discord ↗</a>.</p></div></div>";}
function notFoundPage(){return "<div class='page-shell'><div class='empty-state'><strong>Страница не найдена</strong><p>Проверь адрес или вернись на главную NaZerak.</p><p style='margin-top:18px'><a class='button button-primary' href='/' data-route='/'>На главную</a></p></div></div>";}
function render(){
 const r=routeInfo(); let html;
 switch(r.name){
 case "home":html=homePage();break;case "forum":html=forumPage();break;case "category":html=categoryPage(r.slug);break;
 case "members":html=membersPage();break;case "search":html=searchPage(r.search.get("q")||"");break;case "cabinet":html=cabinetPage();break;
 case "forum/reports":html=reportsPage();break;case "topic":html=topicPage(r.id);break;case "user":html=userPage(r.id);break;case "privacy":html=privacyPage();break;default:html=notFoundPage();
 }
 root.innerHTML=html;
 nav.querySelectorAll("[data-route]").forEach(link=>{const href=link.getAttribute("data-route");const active=href===r.path||(r.name==="category"&&href==="/forum")||(r.name==="topic"&&href==="/forum");if(active)link.setAttribute("aria-current","page");else link.removeAttribute("aria-current");});
 nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");
 const form=document.querySelector("#site-search");
 if(form)form.addEventListener("submit",event=>{event.preventDefault();const q=new FormData(form).get("q").toString().trim();const url=new URL("/search",location.origin);if(q)url.searchParams.set("q",q);history.pushState({},"",url);render();});
}
document.addEventListener("click",async event=>{
 const link=event.target.closest("a[data-route]");
 if(link&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&event.button===0){event.preventDefault();history.pushState({},"",link.getAttribute("href"));render();window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});return;}
 if(event.target.closest("[data-copy-ip]")){try{await navigator.clipboard.writeText(SERVER_IP);showToast("IP сервера скопирован");}catch{const field=document.createElement("textarea");field.value=SERVER_IP;field.setAttribute("aria-label","IP сервера");field.style.position="fixed";field.style.opacity="0";document.body.append(field);field.select();const ok=document.execCommand("copy");field.remove();showToast(ok?"IP сервера скопирован":"Скопируй IP вручную: "+SERVER_IP);}}
 if(event.target.closest("[data-scroll-connect]")){const section=document.querySelector("#connect");if(section){event.preventDefault();section.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}}
});
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menuToggle.setAttribute("aria-expanded",String(open));});
window.addEventListener("popstate",render);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&nav.classList.contains("is-open")){nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");menuToggle.focus();}});
render();