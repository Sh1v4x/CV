(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const D=t=>Object.keys(t).map(e=>t[e]),R=t=>t.reduce((e,s)=>e.concat(Array.isArray(s)?R(s):s),[]),F=t=>[...new Set(t)],M={openSymbol:"{{",closeSymbol:"}}"},I=()=>new RegExp(M.openSymbol+" *(.+?)? *"+M.closeSymbol,"g"),k=t=>{const e=I();let s,n=[];for(;s=e.exec(t);)n.push({key:s[1],sample:s[0]});return n},q=t=>F(k(t).map(e=>e.key)),W=t=>{const e={};return t.nodeValue&&q(t.nodeValue).forEach(s=>{e[s]||(e[s]=[]),e[s].push({node:t,template:t.nodeValue??""})}),e},$=t=>{let e={};return t.childNodes.forEach(s=>{s.nodeType==Node.TEXT_NODE?e={...e,...W(s)}:s.nodeType==Node.ELEMENT_NODE&&(e={...e,...$(s)})}),e},z=(t,e)=>{e.node.nodeValue=k(e.template).reduce((s,n)=>s.replace(n.sample,t[n.key]),e.template)},L=(t,e)=>{e==null||e.forEach(s=>{s.node.nodeType==Node.TEXT_NODE&&z(t,s)})},m=t=>{if(t.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the component element name.");t={attributes:{},removeContent:!1,useShadow:!1,shadowMode:"open",...t};const e=document.createElement("template");return e.innerHTML=(t.style?`<style>${t.style}</style>`:"")+(t.template??""),s=>{s.prototype.connectedCallback=function(){var i;this.baseContent=this.innerHTML,t.removeContent&&(this.innerHTML="");let n=t.classes||"";const r=this.getAttribute("class");if(n&&r&&(n+=" ",r&&(n+=this.getAttribute("class"))),n&&this.setAttribute("class",n),t.attributes)for(const[l,o]of Object.entries(t.attributes))this.setAttribute(l,o);if(s.__attributes__)for(const l of s.__attributes__)this.getAttribute(l)&&(this[l]=this.getAttribute(l));const a=document.importNode(e.content,!0);t.useShadow?this.attachShadow({mode:t.shadowMode}).appendChild(a):this.appendChild(a),this.constructor.__variables__=$(this),(i=this.connected)==null||i.call(this),this.constructor.__isInitialized__=!0,L(this,R(D(this.constructor.__variables__)))},s.prototype.disconnectedCallback=function(){var n;(n=this.disconnected)==null||n.call(this)},Object.defineProperty(s.prototype.constructor,"observedAttributes",{get(){return this.__attributes__??[]}}),s.prototype.attributeChangedCallback=function(n,r,a){var i;r!==a&&(this["__"+n]=a,this.constructor.__isInitialized__&&((i=this.update)==null||i.call(this),L(this,this.constructor.__variables__[n])))},typeof t.extends<"u"?window.customElements.define(t.selector,s,{extends:t.extends}):window.customElements.define(t.selector,s)}},g=()=>(t,e)=>{var s;(s=t.constructor).__attributes__??(s.__attributes__=[]),t.constructor.__attributes__.push(e),Object.defineProperty(t,e,{get(){return t["__"+e]},set(n){t["__"+e]=n,n?this.setAttribute(e,n):this.removeAttribute(e)},enumerable:!0})};class N{constructor(e){this.routes=[],this.root="/",this._mode=e.mode||history.pushState?"history":"hash",this.currentFragment=null,e.routes&&e.routes.forEach(s=>this.addRoute(s))}set mode(e){this._mode=history.pushState?e:"hash"}get mode(){return this._mode}clearSlashes(e){return e.toString().replace(/\/$/,"").replace(/^\//,"")}getFragment(){let e="";if(this._mode==="history")e=this.clearSlashes(decodeURI(location.pathname+location.search)),e=e.replace(/\?(.*)$/,""),e=this.root!="/"?e.replace(this.root,""):e;else{const s=window.location.href.match(/#(.*)$/);e=s?s[1]:""}return this.clearSlashes(e)}openFragment(e){for(let s=0;s<this.routes.length;++s){const n=this.routes[s];let r=e.match("^"+n.path+"$");r&&(r.shift(),n.controller.apply({},r))}}addRoute(e){this.routes.push(e)}removeRoute(e){for(let s=0;s<this.routes.length;++s){const n=this.routes[s];e.toString()===n.path.toString()&&this.routes.splice(s,1)}}check(e){return this.getFragment().match("^"+e+"$")!=null}listen(){const e=()=>{this.currentFragment!==this.getFragment()&&(this.currentFragment=this.getFragment(),this.openFragment(this.currentFragment))};e(),window.addEventListener("popstate",e.bind(this))}navigate(e){this._mode==="history"?history.pushState(null,"",this.root+this.clearSlashes(e)):window.location.href=window.location.href.replace(/#(.*)$/,"")+"#"+e,this.currentFragment!==this.getFragment()&&(this.currentFragment=this.getFragment(),this.openFragment(this.currentFragment))}}const B=(t,e,s)=>{let n=[];for(let l=0;l<=t.length;++l)n[l]=[l];for(let l=0;l<=e.length;++l)n[0][l]=l;for(let l=1;l<=e.length;++l)for(let o=1;o<=t.length;++o)if(t[o-1]===e[l-1])n[o][l]=n[o-1][l-1];else{const d=n[o-1][l],p=n[o][l-1];if(s.replace){const c=n[o-1][l-1];n[o][l]=Math.min(d,p,c)+1}else n[o][l]=Math.min(d,p)+1}let r=t.length,a=e.length,i=[];for(;r!==0&&a!==0;)t[r-1]===e[a-1]?(i.unshift(0),--r,--a):n[r-1][a]<n[r][a-1]?(i.unshift(3),--r):s.replace&&n[r-1][a]===n[r][a-1]?(i.unshift(2),--r,--a):(i.unshift(1),--a);if(r===0&&a>0)for(;a-- >0;)i.unshift(1);else if(r>0&&a===0)for(;r-- >0;)i.unshift(3);return{distance:n[t.length][e.length],editions:i}};class u{static write(e,s,n,r){let a=[];const i=B(e,s,{replace:n.replace});if(!i.distance)return[];let l=e;const o=n.duration?n.duration/i.distance:n.interval??10;let d=0,p=0;for(let c=0;c<i.editions.length;++c){const h=i.editions[c];h===1?a.push(setTimeout((b,v)=>{l=l.substring(0,v)+s[b]+l.substr(v),n.update(l)},(c+1)*o,d,p)):h===2?a.push(setTimeout((b,v)=>{l=l.substring(0,v)+s[b]+l.substr(v+1),n.update(l)},(c+1)*o,d,p)):h===3&&a.push(setTimeout(b=>{l=l.substring(0,b)+l.substr(b+1),n.update(l)},(c+1)*o,p)),h!==3&&(++p,++d)}return r&&a.push(setTimeout(r,i.distance*o,s)),a}}var J=Object.defineProperty,G=Object.getOwnPropertyDescriptor,V=(t,e,s,n)=>{for(var r=n>1?void 0:n?G(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&J(e,s,r),r};let C=class extends HTMLElement{constructor(){super(...arguments),this.router=new N({mode:"hash"}),this.beforePageChanging=null,this.afterPageChanging=null}set mode(t){this.router.mode=t}get mode(){return this.router.mode}addRoute(t){this.router.addRoute({path:t.path,controller:(...e)=>{this.beforePageChanging!==null&&this.beforePageChanging(),this.innerHTML="",this.appendChild(new t.component(e)),this.afterPageChanging!==null&&this.afterPageChanging()}})}removeRoute(t){this.router.removeRoute(t)}listen(){this.router.listen()}navigate(t=""){this.router.navigate(t)}};C=V([m({selector:"app-router"})],C);class X{constructor(){document.body.style.setProperty("--mouse-x","-1000px"),document.body.style.setProperty("--mouse-y","-1000px"),this.updateParallax(),window.addEventListener("resize",this.onWindowResize.bind(this),!1),window.addEventListener("scroll",this.onWindowScroll.bind(this),!1),window.addEventListener("mousemove",this.onMouseMove.bind(this),!1),document.body.addEventListener("mouseleave",this.onMouseLeave.bind(this),!1),document.querySelectorAll("*[trigger-target]").forEach(e=>e.addEventListener("click",s=>this.onTriggerClick(e,s),!1))}updateParallax(){document.querySelectorAll(".parallax").forEach(e=>{const s=e.getBoundingClientRect().top,n=e.getBoundingClientRect().left,r=e.querySelector(".parallax-background");r==null||r.setAttribute("style","left: "+-n+"px; top: "+-s/2+"px;")})}onWindowResize(){this.updateParallax()}onWindowScroll(){this.updateParallax()}onMouseMove(e){document.body.style.setProperty("--mouse-x",`${e.pageX}`),document.body.style.setProperty("--mouse-y",`${e.pageY}`)}onMouseLeave(){document.body.style.setProperty("--mouse-x",`${window.innerWidth/2}`),document.body.style.setProperty("--mouse-y",`${window.innerHeight/2}`)}onTriggerClick(e,s){var o,d,p;if(e.hasAttribute("preventDefault")&&s.preventDefault(),!e.hasAttribute("trigger-target"))return;const n=e.getAttribute("trigger-target"),r=document.querySelectorAll(n),a=(o=e.getAttribute("add-class"))==null?void 0:o.split(" "),i=(d=e.getAttribute("remove-class"))==null?void 0:d.split(" "),l=(p=e.getAttribute("toggle-class"))==null?void 0:p.split(" ");r.forEach(c=>{a&&a.forEach(h=>c.classList.add(h)),i&&i.forEach(h=>c.classList.remove(h)),l&&l.forEach(h=>c.classList.toggle(h))})}}const Y=`<app-header class="scroll-snap-center"></app-header>\r
\r
<div class="container scroll-snap-start">\r
  <h2>Hello World! 👋</h2>\r
\r
  <p class="lead">\r
    <strong\r
      >I'm Bomme--Lasnier Maxime, a French web developer. I program mainly in\r
      Javascript.</strong\r
    ><br />\r
    <br />\r
  </p>\r
  <br />\r
  <div class="row padd">\r
    <div class="col-lg-4">\r
      <img\r
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=Sh1v4x&theme=github_dark&layout=compact"\r
      />\r
    </div>\r
    <div class="col-lg-4">\r
      <img\r
        src="https://github-readme-stats.vercel.app/api?username=Sh1v4x&show_icons=true&theme=github_dark&line_height=20"\r
      />\r
    </div>\r
  </div>\r
</div>\r
`;var U=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,Z=(t,e,s,n)=>{for(var r=n>1?void 0:n?Q(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&U(e,s,r),r};let _=class extends HTMLElement{};_=Z([m({selector:"page-home",classes:"d-block",template:Y})],_);const K=`<a href="#" class="btn lite triangle-left-bullet float-right">Back</a>\r
<h2>Work in progress</h2>\r
`;var ee=Object.defineProperty,te=Object.getOwnPropertyDescriptor,re=(t,e,s,n)=>{for(var r=n>1?void 0:n?te(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&ee(e,s,r),r};let S=class extends HTMLElement{};S=re([m({selector:"page-projects",classes:"d-block",template:K})],S);const ne=`<div id="cv-content" class="container-fluid">\r
  <header class="primary">\r
    <div class="container">\r
      <div class="row py-2">\r
        <div class="col-lg-8">\r
          <h1><a href="#">Maxime Bomme--Lasnier</a></h1>\r
          <h2>\r
            Développeur –\r
            <select id="filter" class="primary">\r
              <option value="web">Développeur Web</option>\r
              <option value="cpp">Développeur Application</option>\r
              <option value="software">Développeur Logiciel</option>\r
            </select>\r
          </h2>\r
        </div>\r
        <aside class="col-lg-4">\r
          <p class="lead">\r
            <i class="lab la-github"></i>\r
            <a href="https://github.com/Sh1v4x" class="underlined"\r
              >github.com/Sh1v4x</a\r
            ><br />\r
            <i class="lab la-linkedin-in"></i>\r
            <a\r
              href="https://www.linkedin.com/in/maxime-bomme-lasnier-ba127a1a4/"\r
              class="underlined"\r
              >www.linkedin.com/in/maxime-bomme-lasnier-ba127a1a4</a\r
            ><br />\r
          </p>\r
        </aside>\r
      </div>\r
      <section class="secondary">\r
        <article class="pr-1 pt-1 pb-0">\r
          <p class="lead mb-0">\r
            Passionné de programmation depuis mes 13 ans.<br />\r
            Diplômé Bac +2 à 3WAcademy Paris.<br />\r
            Spécialisé en Javascript, langage dans lequel je créé en grande\r
            partie tous mes projets.<br />\r
            Je fais également du logiciel, jeu-vidéo, et suis également prêt à\r
            découvrir de nouveaux langages et technologies.\r
          </p>\r
        </article>\r
      </section>\r
    </div>\r
  </header>\r
  <hr />\r
  <div class="container">\r
    <div class="row">\r
      <div class="col-lg-8">\r
        <section>\r
          <h3><i class="las la-toolbox"></i> Expériences</h3>\r
          <br />\r
          <article class="bracket">\r
            <h5>\r
              Blyynd\r
            </h5>\r
            <p>Depuis le 19 décembre 2022, poste actuel</p>\r
            <p>\r
              <strong>Développeur Full-Stack React / Flutter Dart</strong><br />\r
              <strong>Technologies</strong>: React, Typescript, NodeJS, Flutter,\r
              Dart, Firebase, Appium, Allure, Mocha<br />\r
              <strong>Méthodologie</strong>: Agile (Scrum, Kanban)\r
            </p>\r
          </article>\r
          <br />\r
          <article class="bracket">\r
            <h5>\r
              Bureau Vallée\r
            </h5>\r
            <p>Chef de rayon informatique - 2ans</p>\r
            <ul>\r
              <li>Accueil relationnel physique / téléphonique</li>\r
              <li>Gestion de Stocks</li>\r
              <li>\r
                Adaptation des produits à l'évolution et aux opportunités du\r
                marché\r
              </li>\r
              <li>Prise en charge SAV, et dépannage au comptoir</li>\r
            </ul>\r
          </article>\r
          <br />\r
        </section>\r
        <section>\r
          <h3><i class="las la-graduation-cap"></i> Formations</h3>\r
          <article class="bracket">\r
            <h4>Licence</h4>\r
            <div class="row">\r
              <div class="col-10">\r
                <h5>\r
                  Développeur Concepteur D'application (Bac +3/4), en cours<br /><small\r
                    >3WAcademy</small\r
                  >\r
                </h5>\r
                <p class="lead">Promo 2023</p>\r
                <p>\r
                  Etudes sur 1 ans dans l'école d'Expertise en Informatique\r
                  3WAcademy.\r
                </p>\r
              </div>\r
              <div class="col-2">\r
                <img src="img/3wa.png" alt="Logo 3WA" class="img-fluid" />\r
              </div>\r
            </div>\r
          </article>\r
          <article class="bracket">\r
            <h4>Bac + 2</h4>\r
            <div class="row">\r
              <div class="col-10">\r
                <h5>\r
                  Développeur Fullstack (Bac +2)<br /><small>3WAcademy</small>\r
                </h5>\r
                <p class="lead">Promo 2022</p>\r
                <p>\r
                  Etudes sur 1 ans dans l'école d'Expertise en Informatique\r
                  3WAcademy.\r
                </p>\r
              </div>\r
              <div class="col-2">\r
                <img src="img/3wa.png" alt="Logo 3WA" class="img-fluid" />\r
              </div>\r
            </div>\r
          </article>\r
          <article class="bracket">\r
            <h4>Certificat</h4>\r
            <div class="row">\r
              <div class="col-10">\r
                <h5>Développeur Intégrateur Web<br /><small>ESECAD</small></h5>\r
                <p class="lead">Promo 2021</p>\r
                <p>Etudes sur 1 ans dans l'école ESECAD</p>\r
              </div>\r
              <div class="col-2">\r
                <img src="img/esecad.png" alt="Logo ESECAD" class="img-fluid" />\r
              </div>\r
            </div>\r
          </article>\r
          <article class="bracket">\r
            <h5>\r
              Baccalauréat ARCU (Accueil-Relation Clients et Usagers)<br /><small\r
                >Lycée Elsa Triolet (Chartres)</small\r
              >\r
            </h5>\r
            <p>Obtention du <strong>baccalauréat ARCU</strong></p>\r
          </article>\r
        </section>\r
        <hr />\r
\r
        <hr />\r
        <section>\r
          <h3><i class="las la-tools"></i> Projets Personnels</h3>\r
          <article class="bracket">\r
            <h5>Kuirith</h5>\r
            <p class="lead">Projet réalisé en React, Node.JS</p>\r
            <p>\r
              Création d'un site communautaire de partage de post incluant un\r
              système d'achat d'item virtuel autour du jeux Final Fantasy XIV.\r
            </p>\r
          </article>\r
          <article class="bracket">\r
            <h5>Ark Server Manager</h5>\r
            <p class="lead">Projet réalisé en Flutter, Dart, Node.JS</p>\r
            <p>\r
              Gestionnaire de serveur Node.js utilisant la technologie RCON pour\r
              communiquer avec des serveurs ARK hébergés localement afin de\r
              pouvoir envoyer des commandes, ouvrir et fermer les serveurs\r
              depuis une application mobile.<br /><br />\r
              <strong\r
                >Pilier d'un plus gros projet en cours de développement nommé\r
                RoXe permettant de gérer de multiples serveurs de jeux.</strong\r
              >\r
            </p>\r
            <i class="lab la-github">\r
            <a\r
              href="https://github.com/Sh1v4x/Ark-Server-Manager"\r
              class="underlined"\r
              >https://github.com/Sh1v4x/Ark-Server-Manager</a\r
            >\r
          </i>\r
          </article>\r
          <article class="bracket">\r
            <h5>Projet GameVibe</h5>\r
            <p class="lead">Projet réalisé en React, Node.JS</p>\r
            <p>\r
              Création d'un site d'écoute audio orienté dans l'univers du jeu\r
              vidéo.<br />\r
            </p>\r
            <i class="lab la-github">\r
            <a href="https://github.com/Sh1v4x/GameVibe" class="underlined"\r
              >https://github.com/Sh1v4x/GameVibe</a\r
            >\r
          </i>\r
          </article>\r
          <article class="bracket">\r
            <h5>ThreeJS-Playground</h5>\r
            <p class="lead">Projet réalisé en React Typescript, avec ThreeJS</p>\r
            <p>\r
              Mon espace détente, quand je ne sais pas quoi codé, ou que je veux\r
              tenter certaines choses en 3D/2D.<br />\r
            </p>\r
\r
            <ul>\r
              <li>\r
                <i class="lab la-github">\r
                <a\r
                  href="https://sh1v4x.github.io/ThreeJS-Playground/"\r
                  class="underlined"\r
                  >https://sh1v4x.github.io/ThreeJS-Playground/</a\r
                >\r
              </i>\r
              </li>\r
            \r
              <li>\r
                <i class="lab la-github">\r
                <a\r
                  href="https://github.com/Sh1v4x/ThreeJS-Playground"\r
                  class="underlined"\r
                  >https://github.com/Sh1v4x/ThreeJS-Playground</a\r
                >\r
              </i>\r
              </li>\r
              \r
            </ul>\r
          </article>\r
          <article class="bracket">\r
            <h5>GameFinder</h5>\r
            <p class="lead">Projet réalisé en React, Node.JS</p>\r
            <p>\r
              Création d'un site de recherche de jeux vidéo qui indique l'état\r
              de serveur, le prix sur différents plateformes, et l'actualité de\r
              celui-ci <br />\r
            </p>\r
          </article>\r
          <article class="bracket">\r
            <h5>Projet PokeFinder</h5>\r
            <p class="lead">Projet réalisé en Html, CSS, Javascript</p>\r
            <p>\r
              Petit projet utilisant l'API de pokémon pour rechercher des\r
              pokémon par le numéro, et l'afficher sur une carte désigné en CSS.\r
            </p>\r
            <i class="lab la-github">\r
            <a href="https://github.com/Sh1v4x/PokeFinder" class="underlined"\r
              >https://github.com/Sh1v4x/PokeFinder</a\r
            >\r
          </i>\r
          </article>\r
        </section>\r
        <hr />\r
        <section>\r
          <h3><i class="las la-chess-knight"></i> Centres d'intérêt</h3>\r
          <article class="bracket py-0">\r
            <ul class="mt-0">\r
              <li>\r
                Sciences de l'information: Logique, Informatique, Intelligence\r
                Artificielle, Traitement automatique des langues, électronique\r
              </li>\r
              <li>Sciences humaines: Philosophie, Psychologie</li>\r
              <li>Culture: Jeux vidéo, Films, Séries, Musiques</li>\r
              <li>Espace: Astronomie, Astrophysique</li>\r
            </ul>\r
          </article>\r
        </section>\r
      </div>\r
      <aside class="col-lg-4 muted pb-5">\r
        <section>\r
          <h3><i class="las la-wrench"></i> Compétences</h3>\r
          <article class="bracket" style="min-height: 6rem">\r
            <h4>Langages</h4>\r
            <ul class="nopad">\r
              <li class="web">\r
                <span>HTML5</span>\r
                <span>Avancé</span>\r
              </li>\r
              <li class="web">\r
                <span>CSS3/SCSS/Sass</span><span>Avancé</span></app-stars>\r
              </li>\r
              <li class="web"><span>JSON</span><span>Avancé</span></app-stars></li>\r
              <li class="web">\r
                <span>Javascript ES6</span><span>Avancé</span></app-stars>\r
              </li>\r
              <li class="web"><span>MongoDB</span><span>Compétent</span></app-stars></li>\r
              <li class="web"><span>Typescript</span><span>Compétent</span></app-stars></li>\r
              <li class="web"><span>PHP</span><span>Intermédiaire</span></app-stars></li>\r
              <li class="web"><span>PostgreSQL</span><span>Intermédiaire</span></app-stars></li>\r
              <li class="web"><span>SQL</span><span>Intermédiaire</span></app-stars></li>\r
              <li class="software"><span>Python</span><span>Intermédiaire</span></app-stars></li>\r
              <li class="software"><span>C++</span><span>Débutant</span></app-stars></li>\r
              <li class="software"><span>C#</span><span>Débutant</span></app-stars></li>\r
              <li class="cpp">\r
                <span>React Native</span><span>Compétent</span></app-stars>\r
              </li>\r
              <li class="cpp"><span>Dart</span><span>Compétent</span></app-stars></li>\r
            </ul>\r
          </article>\r
          <article class="bracket" style="min-height: 17rem">\r
            <h4>Bibliothèques & Frameworks</h4>\r
            <ul class="nopad">\r
              <li class="web"><span>React</span><span>Avancé</span></app-stars></li>\r
              <li class="web"><span>NodeJS</span> <span>Avancé</span></app-stars></li>\r
              <li class="web"><span>ExpressJS</span> <span>Avancé</span></app-stars></li>\r
              <li class="web"><span>Firebase</span> <span>Avancé</span></app-stars></li>\r
              <li class="web"><span>Jest</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>Mocha</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>Appium</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>NestJS</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>ThreeJS</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>Next.js</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>Bootstrap</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>JQuery</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>MaterialUI</span> <span>Compétent</span></app-stars></li>\r
              <li class="web"><span>Symfony</span> <span>Intermédiaire</span></app-stars></li>\r
              <li class="web"><span>Laravel</span> <span>Intermédiaire</span></app-stars></li>\r
              <li class="web"><span>Vue</span> <span>Intermédiaire</span></app-stars></li>\r
              <li class="web"><span>Angular</span> <span>Intermédiaire</span></app-stars></li>\r
              <li class="web">\r
                <span>.NET Framework</span> <span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="software">\r
                <span></span>Unreal Engine 4 / 5 <span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="software"><span></span>Unity <span>Intermédiaire</span></app-stars></li>\r
              <li class="software">\r
                <span></span>MelonLoaders for Unity Mod <span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="cpp"><span></span>Flutter <span>Compétent</span></app-stars></li>\r
              <li class="cpp"><span></span>Mockito <span>Intermédiaire</span></app-stars></li>\r
              <li class="cpp">\r
                <span></span>Flutter Firebase<span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="cpp">\r
                <span></span>Cloud Functions <span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="cpp">\r
                <span></span>Fluitter Localizations <span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="cpp">\r
                <span></span>Flutter Provider <span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="cpp">\r
                <span></span>Flutter Bloc <span>Intermédiaire</span></app-stars>\r
              </li>\r
              <li class="cpp">\r
                <span></span>Flutter Test <span>Intermédiaire</span></app-stars>\r
              </li>\r
            </ul>\r
          </article>\r
          <article class="bracket" style="min-height: 13rem">\r
            <h4>Logiciels, Outils & OS</h4>\r
            <ul class="nopad">\r
              <li>OS: Windows & Linux, Ubutunu, Ubuntu Server</li>\r
              <li>\r
                IDE:\r
                <span class="software cpp"\r
                  >Visual Studio, Android Studio, XCode </span\r
                >VSCode, WebStorm, PhpStorm\r
              </li>\r
              <li>CI: Github Actions, Jenkins, Microsoft Azure DevOps</li>\r
              <li>Versioning: Git, Sourcetreee</li>\r
              <li>Plateformes Git: Github, Gitlab, BitBucket, Azure Repos</li>\r
              <li>\r
                Build System:<span class="web">Webpack, Parsec, Vite</span\r
                ><span class="cpp">Webpack, Flutter CLI</span>\r
              </li>\r
              <li>\r
                Autres:\r
                <span class="web"\r
                  >NodeJS, PhpMyAdmin, WampServer, Babel, Wordpress, Prestashop </span\r
                >Suite Office, Google Analytics, Blender, Docker, Postman,\r
                Balsamiq Wireframes, pgAdmin, StarUML, DBeaver, MongoDBCompass,\r
                Katalon, Looping, Allure, RCON\r
              </li>\r
            </ul>\r
          </article>\r
          <article class="bracket">\r
            <h4>Langues</h4>\r
            <ul class="nopad">\r
              <li class="language"><span>Français</span> <span>(Langue Natale)</span></li>\r
              <li class="language"><span>Anglais</span> <span>Technique</span></li>\r
              <li class="language"><span>Allemand</span> <span>Base</span></li>\r
            </ul>\r
          </article>\r
          <article class="bracket" style="min-height: 6rem">\r
            <h4>Note de fin ?</h4>\r
            <p>\r
              J'habite avec ma compagne (et notre chat) depuis maintenant 4 ans.\r
              Nous avons emménagé à côté de Toulouse suite à une opportunité\r
              professionnelle qui s’est présentée à elle. Mon précédent travail\r
              se situant maintenant trop loin à mon goût, je saisis\r
              l'opportunité de me reconvertir dans ce qui est, pour moi, ma plus\r
              grande passion. Je suis formé et prêt à démarrer dans le domaine\r
              du développement informatique, et j'espère avoir l'occasion de\r
              vous le montrer !\r
            </p>\r
          </article>\r
        </section>\r
      </aside>\r
    </div>\r
  </div>\r
  <app-window caption="style.css"></app-window>\r
  <style id="filter-style"></style>\r
</div>\r
<style id="cv-style"></style>\r
`,x=`* {\r
	transition: all 1s;\r
}\r
\r
body {\r
	--default-bg-color: #112255;\r
}\r
\r
page-cv {\r
	transform: translateZ(-10rem);\r
}\r
\r
app-window {\r
	transform: translate3d(35vw, 0, 10rem);\r
}\r
\r
app-window > section {\r
	font-size: 13px;\r
	line-height: 1;\r
}\r
\r
.primary {\r
	background-color: #1a1c24;\r
	border: 0 solid #1a1c24;\r
	color: #eee;\r
}\r
\r
.secondary {\r
	background-color: #008cba;\r
	border: 0 solid #008cba;\r
	color: #eee;\r
}\r
\r
header article::before {\r
	content: "";\r
	position: absolute;\r
	top: 0;\r
	right: 0;\r
	width: 15px;\r
	height: 15px;\r
	border-color: #1a1c24 #1a1c24 transparent transparent;\r
	border-style: solid;\r
	border-width: 15px;\r
}\r
\r
header + hr {\r
	border-top: 1rem solid #008cba;\r
	margin: 0;\r
}\r
\r
.section h2 {\r
	margin: 1rem 0;\r
	padding-bottom: .2rem;\r
	border-bottom: 2px solid currentcolor;\r
}\r
\r
.section h3 {\r
	margin: 1rem 0;\r
	font-size: 30px;\r
	font-weight: 300;\r
}\r
\r
h4 {\r
	transform-origin: top left;\r
	transform: translateX(-1rem) rotate(90deg);\r
	white-space: nowrap;\r
	position: absolute;\r
}\r
\r
article {\r
	margin-left: 2rem;\r
}\r
\r
.section {\r
	position: relative;\r
	margin: .5rem;\r
	padding: 1rem;\r
	border-width: 2px;\r
}\r
\r
li {\r
	margin-bottom: 0.5rem;\r
}\r
\r
.muted {\r
	background-color: grey;\r
	border: 0 solid grey;\r
	color: #eee;\r
}\r
\r
body {\r
	--default-bg-color: #eee;\r
	--default-color: #010101;\r
}\r
\r
#cv-content > .container {\r
	background-color: #fff;\r
}\r
\r
app-window {\r
	transform: translate3d(100vw, 0, 10rem) rotateY(-90deg);\r
	opacity: 0;\r
}\r
\r
::-webkit-scrollbar {\r
	width: 0 !important;\r
}\r
\r
page-cv.d-block {\r
	transform: none;\r
}\r
\r
body .page-corners {\r
	background-image: none;\r
}\r
\r
body.grid-background {\r
	background-image: none;\r
}\r
\r
#cv-content {\r
	padding: 0px;\r
}\r
\r
body app-main {\r
	margin: 0px;\r
	padding: 0px;\r
}\r
\r
.bracket {\r
	padding-left: 0.5rem;\r
	margin-bottom: 1rem;\r
}\r
\r
.bracket::before {\r
	content: "";\r
	display: block;\r
	position: absolute;\r
	width: 6px;\r
	height: 100%;\r
	left: -4px;\r
	border-style: solid;\r
	border-color: rgba(26, 28, 36, .25);\r
	border-width: 2px 0 2px 2px;\r
}\r
\r
.muted .bracket::before {\r
	border-color: white;\r
}\r
\r
* {\r
	transition: all 0s;\r
}\r
\r
app-window {\r
	display: none;\r
	transform: none;\r
}\r
`;var se=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,ie=(t,e,s,n)=>{for(var r=n>1?void 0:n?ae(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&se(e,s,r),r};let P=class extends HTMLElement{constructor(){super(...arguments),this.timeout=null,this.filter="web"}connected(){var t;this.styleElement=this.querySelector("#cv-style"),this.styleRenderElement=this.querySelector("app-window > section"),this.initWriter(),(t=this.querySelector("#filter"))==null||t.addEventListener("change",e=>{this.filter=e.target.options[e.target.selectedIndex].value,this.updateFilter()},!1),this.updateFilter()}disconnected(){this.timeout&&clearTimeout(this.timeout)}updateFilter(){const t=this.querySelector("#filter-style");t&&(t.innerHTML=this.filter==="all"?"section.all, section.software, section.cpp, section.web, article.all, article.software, article.cpp, article.web { display: block; } span.all, span.software, span.cpp, span.web, li.all, li.software, li.cpp, li.web { display: block; }":`section.${this.filter}, article.${this.filter} { display: block; } span.${this.filter}, li.${this.filter} { display: block; }`)}isMobileDevice(){let t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t}initWriter(){if(this.isMobileDevice()){this.styleElement.innerHTML=x;return}let t=0;if(this.styleElement){this.styleElement.innerHTML="";const e=()=>{for(let s=0;s<10;++s){if(t==x.length)return;const n=x[t++];this.styleElement.innerHTML+=n,this.styleRenderElement&&this.parseCss(n,!1)}this.timeout=setTimeout(e,1)};e()}}parseCss(t,e){this.styleRenderElement&&(t==="/"&&e===!1?(e=!0,this.styleRenderElement.innerHTML+=t):t==="/"&&e===!0?(e=!1,this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/(\/[^\/]*\*)$/,'<em class="comment">$1/</em>')):t===":"?this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/([a-zA-Z- ^\n]*)$/,'<em class="key">$1</em>:'):t===";"?this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/([^:]*)$/,'<em class="value">$1</em>;'):t==="{"?this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/(.*)$/,'<em class="selector">$1</em>{'):t===`
`?this.styleRenderElement.innerHTML+="<br>":t==="	"?this.styleRenderElement.innerHTML+="&#09;":this.styleRenderElement.innerHTML+=t)}};P=ie([m({selector:"page-cv",classes:"d-block",template:ne})],P);const le=`<header class="scale-2 scale-sm-3 scale-md-4 scale-lg-5">\r
  <div class="mouse-oriented">\r
    <div class="title">\r
      <h1>{{ h1 }}</h1>\r
      <h2>{{ h2 }}</h2>\r
      <div class="smoke"></div>\r
    </div>\r
    <nav class="lead pl-0">\r
      <ul class="list-default d-flex justify-content-center my-3">\r
        <li>\r
          <a href="https://github.com/Sh1v4x?tab=repositories" class="btn lite"\r
            >Projects</a\r
          >\r
        </li>\r
        <li><a href="cv" class="btn lite page">CV</a></li>\r
      </ul>\r
    </nav>\r
    <hr />\r
    <nav class="lead pl-0">\r
      <ul\r
        class="list-default d-flex justify-content-center my-3 line-height-normal"\r
      >\r
        <li>\r
          <a class="mx-1" href="https://github.com/Sh1v4x"\r
            ><img\r
              src="https://img.shields.io/static/v1?label=&message=Github&color=grey&logo=github&logoColor=white&style=for-the-badge"\r
              alt="Github"\r
          /></a>\r
        </li>\r
        <li>\r
          <a\r
            class="mx-1"\r
            href="https://www.linkedin.com/in/maxime-bomme-lasnier-ba127a1a4/"\r
            ><img\r
              src="https://img.shields.io/static/v1?label=&message=LinkedIn&color=blue&logo=linkedin&logoColor=white&style=for-the-badge"\r
              alt="LinkedIn"\r
          /></a>\r
        </li>\r
      </ul>\r
    </nav>\r
    <hr />\r
  </div>\r
</header>\r
<span class="scroll-arrow"></span>\r
`;var oe=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,E=(t,e,s,n)=>{for(var r=n>1?void 0:n?ce(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&oe(e,s,r),r};let y=class extends HTMLElement{constructor(){super(...arguments),this.h1="",this.h2="",this.timeouts=[]}connected(){this.initWriter(),this.initMenu(),typeof screen.orientation<"u"&&(document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.body.addEventListener("mouseleave",this.onMouseMove.bind(this)))}disconnected(){this.timeouts.forEach(t=>clearTimeout(t))}addTimeouts(t){for(this.timeouts=[...this.timeouts,...t];this.timeouts.length>=100;)this.timeouts.shift()}initWriter(){const t={interval:70,replace:!0,update:this.updateH1.bind(this)},e={interval:50,replace:!0,update:this.updateH2.bind(this)},s=()=>this.addTimeouts(u.write(this.h1,"Hello World !",t,()=>this.addTimeouts([setTimeout(n,1e3)]))),n=()=>this.addTimeouts(u.write(this.h1,"</>",t,r)),r=()=>this.addTimeouts(u.write(this.h1,"<I'm Maxime/>",t,()=>this.addTimeouts([setTimeout(a,1e3)]))),a=()=>this.addTimeouts(u.write(this.h1,"I'm Maxime",t,i)),i=()=>this.addTimeouts(u.write(this.h2,"Welcome to my website",e,()=>{this.addTimeouts([setTimeout(l,5e3)]),this.addTimeouts([setTimeout(d,6e3)])})),l=()=>this.addTimeouts(u.write(this.h1,"Maxime",t,o)),o=()=>this.addTimeouts(u.write(this.h1,"Maxime Bomme--Lasnier",t,()=>{this.addTimeouts([setTimeout(p,15e3)]),this.addTimeouts([setTimeout(c,15e3)])})),d=()=>this.addTimeouts(u.write(this.h2,"Web developer",e)),p=()=>this.addTimeouts(u.write(this.h1,"",t,s)),c=()=>this.addTimeouts(u.write(this.h2,"",e));this.addTimeouts([setTimeout(s,0)])}initMenu(){const t=document.querySelector("app-router");this.querySelectorAll("a.page").forEach(e=>{const s=e.getAttribute("href")||"";e.addEventListener("click",n=>{n.preventDefault(),t.navigate(s)})})}updateH1(t){this.h1=t,this.querySelector("h1").innerHTML=t}updateH2(t){this.h2=t,this.querySelector("h2").innerHTML=t}onMouseMove(t){const e=parseInt(document.body.style.getPropertyValue("--mouse-x"))|0,s=parseInt(document.body.style.getPropertyValue("--mouse-y"))|0,n=Math.min(Math.max(-1,(e/window.innerWidth-.5)*2),1),r=Math.min(Math.max(-1,(s/window.innerHeight-.5)*2),1),a=.2,i=-r*a*90,l=n*a*90;this.querySelector(".mouse-oriented").style.transform=`rotateX(${i}deg) rotateY(${l}deg)`}};E([g()],y.prototype,"h1",2);E([g()],y.prototype,"h2",2);y=E([m({selector:"app-header",classes:"w-100 h-100 align-center select-none",template:le})],y);const pe="";var de=Object.defineProperty,he=Object.getOwnPropertyDescriptor,ue=(t,e,s,n)=>{for(var r=n>1?void 0:n?he(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&de(e,s,r),r};let A=class extends HTMLElement{};A=ue([m({selector:"app-footer",template:pe})],A);const me=`<header class="d-flex justify-content-between">\r
	<h3 class="lead m-1 inline">{{ caption }}</h3>\r
	<div class="controls d-flex">\r
		<button class="minimize"><i class="las la-minus"></i></button>\r
		<button class="expand"><i class="las la-stop"></i></button>\r
		<button class="close"><i class="las la-times"></i></button>\r
	</div>\r
</header>\r
<section class="p-1">\r
	{{ baseContent }}\r
</section>\r
<button class="resize"></button>\r
`;var ge=Object.defineProperty,be=Object.getOwnPropertyDescriptor,w=(t,e,s,n)=>{for(var r=n>1?void 0:n?be(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&ge(e,s,r),r};let f=class extends HTMLElement{constructor(t,e,s="5rem",n="5rem"){super(),this.caption="",this.anchorX=0,this.anchorY=0,this.moving=!1,this.resizing=!1,this.canMove=t,this.canResize=e,this.minWidth=300,this.minHeight=150,this.style.left=s,this.style.top=n,this.style.minWidth=this.minWidth+"px",this.style.minHeight=this.minHeight+"px",this.style.maxWidth="100%",this.style.maxHeight="100%"}connected(){var e,s,n,r;this.addEventListener("mousedown",this.setFocus.bind(this),!1),document.addEventListener("mouseup",this.unsetFocus.bind(this),!1);const t=this.querySelector("header");t==null||t.addEventListener("mousedown",this.moveGrab.bind(this),!1),document.addEventListener("mousemove",this.drag.bind(this),!1),document.addEventListener("mouseup",this.drop.bind(this),!1),(e=this.querySelector("button.resize"))==null||e.addEventListener("mousedown",this.resizeGrab.bind(this),!1),(s=t==null?void 0:t.querySelector(".minimize"))==null||s.addEventListener("mouseup",this.minimize.bind(this),!1),(n=t==null?void 0:t.querySelector(".expand"))==null||n.addEventListener("mouseup",this.expand.bind(this),!1),(r=t==null?void 0:t.querySelector(".close"))==null||r.addEventListener("mouseup",this.close.bind(this),!1)}setFocus(){this.style.zIndex="3"}unsetFocus(){this.moving=!1}moveGrab(t){if(!this.canMove)return;const e=this.getBoundingClientRect();this.moving=!0,this.anchorX=t.clientX-e.left,this.anchorY=t.clientY-e.top}drag(t){var s;const e=this.getBoundingClientRect();if(this.moving){const n=(s=this.parentElement)==null?void 0:s.getBoundingClientRect();n&&(this.style.left=Math.min(Math.max(n.left,t.clientX-this.anchorX),n.right-e.width)+"px",this.style.top=Math.min(Math.max(n.top,t.clientY-this.anchorY),n.bottom-e.height)+"px")}else this.resizing&&(this.style.width=String(Math.max(this.minWidth,t.clientX-e.left))+"px",this.style.height=String(Math.max(this.minHeight,t.clientY-e.top))+"px")}drop(){this.moving=!1,this.resizing=!1}resizeGrab(){this.resizing=this.canResize}minimize(){}expand(){}close(){this.animate([{opacity:1,transform:"translateY(0) scale(1)"},{opacity:0,transform:"translateY(5rem) scale(.5)"}],{duration:200,easing:"ease-out",iterations:1}),setTimeout(()=>{var t;(t=this.parentElement)==null||t.removeChild(this)},200)}};w([g()],f.prototype,"caption",2);w([g()],f.prototype,"moving",2);w([g()],f.prototype,"resizing",2);w([g()],f.prototype,"canResize",2);f=w([m({selector:"app-window",template:me,removeContent:!0})],f);var fe=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,we=(t,e,s,n)=>{for(var r=n>1?void 0:n?ve(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&fe(e,s,r),r};let O=class extends HTMLElement{};O=we([m({selector:"app-windows-area"})],O);var ye=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,H=(t,e,s,n)=>{for(var r=n>1?void 0:n?xe(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&ye(e,s,r),r};let T=class extends HTMLElement{connected(){for(let t=0;t<Math.floor(this.stars);++t)this.addStar(0);this.stars%1!=0&&this.addStar(1);for(let t=Math.ceil(this.stars);t<5;++t)this.addStar(2)}addStar(t){const e=document.createElement("i");switch(t){case 0:{e.classList.add("las","la-star");break}case 1:{e.classList.add("las","la-star-half-alt");break}case 2:{e.classList.add("lar","la-star");break}}this.appendChild(e)}};H([g()],T.prototype,"stars",2);T=H([m({selector:"app-stars"})],T);const _e=`<app-router class="d-contents"></app-router>\r
`;var Se=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,Te=(t,e,s,n)=>{for(var r=n>1?void 0:n?Pe(e,s):e,a=t.length-1,i;a>=0;a--)(i=t[a])&&(r=(n?i(e,s,r):i(r))||r);return n&&r&&Se(e,s,r),r};new X;let j=class extends HTMLElement{connected(){this.initRouter()}initRouter(){const t=this.querySelector("app-router");t.mode="hash",Array({path:"",component:_},{path:"projects",component:S},{path:"cv",component:P}).forEach(e=>t.addRoute(e)),t.listen()}};j=Te([m({selector:"app-main",classes:"scroll-snap-proximity",template:_e})],j);
