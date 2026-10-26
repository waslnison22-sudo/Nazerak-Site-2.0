const BASE_PATH = location.hostname.endsWith("github.io") ? "/Nazerak-Site-2.0" : "";
const DISCORD_URL = "https://discord.gg/2KvsYYDHN6";
const root = document.querySelector("#main");
const nav = document.querySelector("#primary-nav");
const menuToggle = document.querySelector(".menu-toggle");
document.querySelector("#year").textContent = String(new Date().getFullYear());
const knownRoutes = ["/"];
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
function homePage() {
 return `
 <section class="hero hero--autumn" aria-labelledby="hero-title">
   <div class="hero-image" aria-hidden="true"></div><div class="hero-grain" aria-hidden="true"></div>
   <div class="container hero-inner">
     <div class="hero-content" data-reveal>
       <p class="eyebrow"><span class="eyebrow-dot"></span> MINECRAFT · ROLEPLAY · COMMUNITY</p>
       <h1 id="hero-title">Твоя история.<br><em>Твой мир.</em></h1>
       <p class="hero-copy">NaZerak — Minecraft-мир, где игроки создают организации, принимают решения и пишут общую историю.</p>
       <div class="hero-actions"><a class="button button-primary" href="#download" data-scroll-download>Скачать лаунчер <span aria-hidden="true">↓</span></a><a class="button button-glass" href="#about" data-scroll-about>Исследовать мир <span aria-hidden="true">↘</span></a></div>
       <div class="hero-meta"><span class="meta-mark"></span><span>Minecraft Java Edition</span><i></i><span>NaZerak Launcher</span></div>
     </div>
     <div class="hero-side-note" data-reveal data-reveal-delay="180"><span class="side-note-line"></span><span>ТВОЯ ИСТОРИЯ<br>НАЧИНАЕТСЯ ЗДЕСЬ</span><span class="side-note-index">N / 01</span></div>
   </div>
   <a class="scroll-cue" href="#about" data-scroll-about aria-label="Прокрутить к разделу о проекте"><span></span><small>ЛИСТАЙ НИЖЕ</small></a>
 </section>
 <section class="intro-section section" id="about"><div class="container">
   <div class="intro-top" data-reveal><p class="section-kicker">01 / МИР NaZerak</p><p class="intro-aside">Не просто заходи в игру.<br><strong>Стань частью истории.</strong></p></div>
   <div class="intro-head" data-reveal><h2>Каждый выбор<br>оставляет <em>след.</em></h2><p>Исследуй мир, находи союзников, создавай собственную историю и влияй на события вместе с другими игроками.</p></div>
   <div class="feature-grid feature-grid--editorial">
     <article class="feature-card feature-card--lead" data-reveal><span class="feature-number">01 <i>— ИСТОРИЯ</i></span><div class="feature-icon feature-icon--story" aria-hidden="true">↗</div><h3>Твоя роль.<br>Твои решения.</h3><p>Создай персонажа и преврати обычные игровые дни в историю, которую захочется продолжить.</p><span class="card-index">N / 01</span></article>
     <article class="feature-card feature-card--org" data-reveal data-reveal-delay="100"><span class="feature-number">02 <i>— ОРГАНИЗАЦИИ</i></span><div class="feature-icon feature-icon--org" aria-hidden="true">⌘</div><h3>Строй связи.<br>Меняй мир.</h3><p>Объединяйся с игроками, участвуй в жизни организаций и влияй на развитие мира.</p><span class="card-index">N / 02</span></article>
     <article class="feature-card feature-card--community" data-reveal data-reveal-delay="200"><span class="feature-number">03 <i>— СООБЩЕСТВО</i></span><div class="feature-icon feature-icon--community" aria-hidden="true">◎</div><h3>Мир создают<br>люди.</h3><p>Знакомься, объединяйся и создавай совместные истории с сообществом NaZerak.</p><span class="card-index">N / 03</span></article>
   </div>
 </div></section>
 <section class="world-section" aria-label="Мир NaZerak"><div class="world-backdrop" aria-hidden="true"></div><div class="container world-inner" data-reveal><p class="section-kicker">02 / ТВОЯ ГЛАВА</p><h2>У этого мира<br>нет готового <em>сценария.</em></h2><p>Он пишется поступками игроков. Начни с малого — и однажды именно твоя история станет частью NaZerak.</p><a class="text-link" href="#download" data-scroll-download>Начать свою историю <span aria-hidden="true">↘</span></a><div class="world-coordinate">N / ZK</div></div></section>
 <section class="connect-section section" id="download"><div class="container"><div class="connect-heading" data-reveal><p class="section-kicker">03 / НАЧАЛО ПУТИ</p><h2>В NaZerak —<br><em>через свой лаунчер.</em></h2><p>Устанавливай NaZerak Launcher и запускай игру через него. Адреса серверов вручную вводить не потребуется.</p></div>
   <div class="launcher-download-panel" data-reveal>
     <div class="launcher-download-mark" aria-hidden="true"><span class="launcher-cube"></span></div>
     <div class="launcher-download-copy"><p class="install-step-label">NaZerak Launcher · Windows</p><h3>Всё для игры — в одном месте.</h3><p>Лаунчер должен подготовить игровые файлы и открыть подключение к NaZerak. Публиковать ссылку на установщик можно только после загрузки проверенной сборки.</p></div>
     <div class="launcher-download-action"><span class="launcher-status"><span class="launcher-status-dot"></span> Установщик ещё не опубликован</span><a class="button button-primary" href="https://github.com/waslnison22-sudo/NazerakLauncher/releases" target="_blank" rel="noopener noreferrer">Проверить релиз <span aria-hidden="true">↗</span></a></div>
   </div>
   <div class="community-cta" data-reveal><div><p class="section-kicker">ТЫ НЕ ОДИН</p><h3>Увидимся в Discord.</h3><p>Новости проекта, помощь с лаунчером и общение с сообществом.</p></div><a class="button button-primary" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Присоединиться <span aria-hidden="true">↗</span></a></div>
 </div></section>
`;
}
function cabinetPage(){return "<section class=\"cabinet-page page-shell\"><header class=\"page-heading\"><p class=\"section-kicker\">NaZerak</p><h1>Личный кабинет</h1><p>Твой профиль и настройки проекта — в одном месте.</p></header><div class=\"cabinet-card\"><div class=\"cabinet-mark\" aria-hidden=\"true\">N<span>/</span></div><h2>Войти в NaZerak</h2><p>Авторизация через Discord будет подключена после проверки настроек существующего аккаунта Supabase.</p><a class=\"button button-primary\" href=\""+DISCORD_URL+"\" target=\"_blank\" rel=\"noopener noreferrer\">Открыть Discord <span aria-hidden=\"true\">↗</span></a><a class=\"cabinet-back\" href=\"/\" data-route=\"/\">Вернуться на главную</a></div></section>";}
function notFoundPage(){return "<div class='page-shell'><div class='empty-state'><strong>Страница не найдена</strong><p>Проверь адрес или вернись на главную NaZerak.</p><p style='margin-top:18px'><a class='button button-primary' href='/' data-route='/'>На главную</a></p></div></div>";}
function render(){
 const r=routeInfo(); let html;
 switch(r.name){
 case "home":html=homePage();break;default:html=notFoundPage();
 }
 root.innerHTML=html;
 applyBasePathLinks();
 const revealItems = root.querySelectorAll("[data-reveal]");
 revealItems.forEach(item => item.style.setProperty("--reveal-delay", (Number(item.dataset.revealDelay) || 0) + "ms"));
 if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
   const revealObserver = new IntersectionObserver(entries => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add("is-visible");
         revealObserver.unobserve(entry.target);
       }
     });
   }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
   revealItems.forEach(item => revealObserver.observe(item));
 } else {
   revealItems.forEach(item => item.classList.add("is-visible"));
 }
 nav.querySelectorAll("[data-route]").forEach(link=>{const href=link.getAttribute("data-route");if(href===r.path)link.setAttribute("aria-current","page");else link.removeAttribute("aria-current");});
 nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");

}
document.addEventListener("click",async event=>{
 const link=event.target.closest("a[data-route]");
 if(link&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&event.button===0){event.preventDefault();history.pushState({},"",link.getAttribute("href"));render();window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});return;}
 if(event.target.closest("[data-scroll-connect]")){const section=document.querySelector("#connect");if(section){event.preventDefault();section.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}}
  if(event.target.closest("[data-scroll-download]")){const section=document.querySelector("#download");if(section){event.preventDefault();section.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}}
  if(event.target.closest("[data-scroll-about]")){const section=document.querySelector("#about");if(section){event.preventDefault();section.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}else{event.preventDefault();location.href=BASE_PATH+"/#about";}}
});
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menuToggle.setAttribute("aria-expanded",String(open));});
window.addEventListener("popstate",render);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&nav.classList.contains("is-open")){nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");menuToggle.focus();}});
render();