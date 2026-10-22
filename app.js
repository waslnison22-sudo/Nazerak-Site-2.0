const BASE_PATH = location.hostname.endsWith("github.io") ? "/Nazerak-Site-2.0" : "";
const SERVER_IP = "nazehard.rustix.cc";
const DISCORD_URL = "https://discord.gg/2KvsYYDHN6";
const root = document.querySelector("#main");
const nav = document.querySelector("#primary-nav");
const menuToggle = document.querySelector(".menu-toggle");
document.querySelector("#year").textContent = String(new Date().getFullYear());
const knownRoutes = ["/", "/cabinet"];
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
 <section class="connect-section section" id="connect"><div class="container"><div class="connect-heading" data-reveal><p class="section-kicker">03 / КАК НАЧАТЬ ИГРАТЬ</p><h2>Три шага — и ты<br><em>в мире NaZerak.</em></h2><p>Подготовь Minecraft Java Edition и подключись к серверу. Никаких выдуманных загрузчиков и лишних программ.</p></div>
   <div class="install-grid">
     <article class="install-step" data-reveal><span class="install-step-number">01</span><div class="install-step-art install-step-art--game" aria-hidden="true"><span>▦</span></div><p class="install-step-label">ПОДГОТОВКА</p><h3>Установи Minecraft</h3><p>Нужна Minecraft Java Edition версии <strong>1.21.11</strong>. Используй официальный лаунчер и свою лицензионную игру.</p><a class="text-link" href="https://www.minecraft.net/download" target="_blank" rel="noopener noreferrer">Официальная загрузка <span aria-hidden="true">↗</span></a></article>
     <article class="install-step" data-reveal data-reveal-delay="100"><span class="install-step-number">02</span><div class="install-step-art install-step-art--settings" aria-hidden="true"><span>⌘</span></div><p class="install-step-label">НАСТРОЙКА</p><h3>Выбери версию</h3><p>В лаунчере создай или выбери установку Minecraft Java Edition <strong>1.21.11</strong> и запусти игру.</p><span class="install-step-note">Версия сервера: 1.21.11</span></article>
     <article class="install-step" data-reveal data-reveal-delay="200"><span class="install-step-number">03</span><div class="install-step-art install-step-art--world" aria-hidden="true"><span>↗</span></div><p class="install-step-label">ПОДКЛЮЧЕНИЕ</p><h3>Добавь сервер</h3><p>Открой «Сетевая игра» → «Добавить сервер», укажи адрес <strong>${SERVER_IP}</strong> и сохрани настройки.</p><a class="text-link" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Нужна помощь? Discord <span aria-hidden="true">↗</span></a></article>
   </div>
   <div class="install-note" data-reveal><span class="install-note-mark">i</span><p><strong>Важно:</strong> используйте только адрес сервера, опубликованный в официальных каналах NaZerak. Если подключение не удаётся, проверьте версию игры и обратитесь в Discord.</p></div>
   <div class="community-cta" data-reveal><div><p class="section-kicker">ТЫ НЕ ОДИН</p><h3>Увидимся в Discord.</h3><p>Новости проекта, помощь с подключением и общение с сообществом.</p></div><a class="button button-primary" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Присоединиться <span aria-hidden="true">↗</span></a></div>
 </div></section>
`;
}

function cabinetPage(){return "<section class=\"cabinet-page page-shell\"><header class=\"page-heading\"><p class=\"section-kicker\">NaZerak</p><h1>Личный кабинет</h1><p>Твой профиль и настройки проекта — в одном месте.</p></header><div class=\"cabinet-card\"><div class=\"cabinet-mark\" aria-hidden=\"true\">N<span>/</span></div><h2>Войти в NaZerak</h2><p>Авторизация через Discord будет подключена после проверки настроек существующего аккаунта Supabase.</p><a class=\"button button-primary\" href=\""+DISCORD_URL+"\" target=\"_blank\" rel=\"noopener noreferrer\">Открыть Discord <span aria-hidden=\"true\">↗</span></a><a class=\"cabinet-back\" href=\"/\" data-route=\"/\">Вернуться на главную</a></div></section>";}
function notFoundPage(){return "<div class='page-shell'><div class='empty-state'><strong>Страница не найдена</strong><p>Проверь адрес или вернись на главную NaZerak.</p><p style='margin-top:18px'><a class='button button-primary' href='/' data-route='/'>На главную</a></p></div></div>";}
function render(){
 const r=routeInfo(); let html;
 switch(r.name){
 case "home":html=homePage();break;case "cabinet":html=cabinetPage();break;default:html=notFoundPage();
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
  if(event.target.closest("[data-scroll-about]")){const section=document.querySelector("#about");if(section){event.preventDefault();section.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}else{event.preventDefault();location.href=BASE_PATH+"/#about";}}
});
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menuToggle.setAttribute("aria-expanded",String(open));});
window.addEventListener("popstate",render);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&nav.classList.contains("is-open")){nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");menuToggle.focus();}});
render();