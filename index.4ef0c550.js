(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}handleEvent(t){if(t.type==="click"){t.preventDefault();const e=t.composedPath()[0].dataset.action;if(e==="config"&&(this.minutes.disabled?(this.setTimer(!1),this.setConfig("edit",!1,"START"),this.progress.style.animation=""):this.setConfig("default",!0,"START")),e==="start-stop"){const r=t.composedPath()[0];r.classList.contains("start")?(this.setConfig("default",!0,"STOP"),this.setTimer(!0),r.classList.remove("start"),this.progress.style.animationPlayState!=="paused"&&(this.progress.style.animation="var(--animation-time)",this.progress.style.animationDuration=`${this.totalTimer}s`),this.progress.style.animationPlayState="running"):(this.setTimer(!1),this.setConfig("stop",!0,"START"),this.progress.style.animationPlayState="paused")}}}setConfig(t,e,r){this.pomodoro.style.setProperty("--timer-color",`var(--${t}-color)`),this.disableTimer(e),this.start.textContent=r,this.start.classList.add("start")}disableTimer(t){this.minutes.disabled=t,this.seconds.disabled=t,t?(this.minutes.classList.remove("blink"),this.seconds.classList.remove("blink")):(this.minutes.classList.add("blink"),this.seconds.classList.add("blink"))}static get styles(){return`
      :host {
        --size-timer: 500px;
      }

      .pomodoro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: var(--size-timer);
        height: var(--size-timer);
        background: radial-gradient(circle 250px, #3a393f, #17171a);
        border-radius: 50%;
        box-shadow:
          -5px 14px 44px #000,
          5px -16px 50px #fff4;
        position: relative;
        box-sizing: content-box;
        position: relative;
      }

      svg{
        width: 520px;
        height: 520px;
        position: absolute;
        box-sizing: content-box;
        z-index: -5;
        transform: rotate(91deg);
      }

      .loader circle{
        stroke: var(--timer-color);
        fill: transparent;
        stroke-width: 9;
        stroke-dasharray: 1603;
        stroke-dashoffset: 0;
      }

      @keyframes spin {
        100% {
          stroke-dashoffset: 1603;
        }
      }

      .timer {
        display: flex;
      }

      .time-text {
        font-family: "Bebas Neue";
        font-size: 196px;
        background: var(--gradient-text-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-top: 4.5rem;
      }

      input[type="number"] {
        width: 146px;
        border: none;
      }

      input:first-child {
        text-align: right;
      }

      input:last-child {
        text-align: left;
      }

      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      .timer .blink {
        border-bottom: 1px dashed #fff;
      }

      .btn-start {
        margin-top: 1.5rem;
        width: 40%;
        height: 28px;
        text-align: center;
        cursor: pointer;
      }

      .btn-start p {
        margin: 0;
        height: 30px;
        font-family: Montserrat;
        font-weight: bold;
        letter-spacing: 0.6em;
        background: var(--gradient-text-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .btn-edit {
        margin-top: 2.5rem;
        width: 42px;
        height: 42px;
        cursor: pointer;
      }

      .btn-edit img {
        width: 24px;
        height: 24px;
        opacity: 0.7;
      }
    `}startTimer(t,e){t>59&&(t=59),e>59&&(e=60),e--,e<0&&(e=59,t--,t<0&&(clearInterval(this.nIntervalID),this.pomodoro.style.setProperty("--timer-color","var(--finish-color)"),this.progress.style.animation="",t=0,e=0,this.nIntervalID=null)),this.minutes.value=t.toString().padStart(2,"0"),this.seconds.value=e.toString().padStart(2,"0")}setTimer(t){this.totalTimer=parseInt(this.minutes.value)*60+parseInt(this.seconds.value),console.log("\u{1F680} ~ totalTimer: ",this.totalTimer),t?this.nIntervalID=setInterval(()=>{const e=this.minutes.value,r=this.seconds.value;this.startTimer(e,r)},1e3):(clearInterval(this.nIntervalID),this.nIntervalID=null)}init(){this.pomodoro=this.shadowRoot.querySelector(".loader"),this.minutes=this.shadowRoot.querySelectorAll("input")[0],this.seconds=this.shadowRoot.querySelectorAll("input")[1],this.start=this.shadowRoot.querySelector(".start"),this.progress=this.shadowRoot.querySelector("circle")}connectedCallback(){this.render(),this.init(),this.addEventListener("click",this)}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="pomodoro">
      <svg class="loader">
        <circle cx="260" cy="260" r="255" stroke-linecap="round"></circle>
      </svg>
      <div class="timer">
        <input disabled value="15" type="number" min="0" max="59" class="time-text">
        <span class="time-text">:</span>
        <input disabled value="00" type="number" min="0" max="59" class="time-text">
      </div>
      <div class="btn-start">
        <p data-action="start-stop" class="start">START</p>
      </div>
      <div class="btn-edit">
        <img data-action="config" src="images/gear.svg" alt="gear">
      </div>
    </div>`}}customElements.define("pomodoro-timer",n);
