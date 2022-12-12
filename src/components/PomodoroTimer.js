class PomodoroTimer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent (event) {
    if (event.type === "click") {
      event.preventDefault();
      const action = event.composedPath()[0].dataset.action;

      if (action === "config") {
        if (this.minutes.disabled) {
          this.setTimer(false);
          this.setConfig("edit", false, "START");
        } else {
          this.setConfig("default", true, "START");
        }
      }

      if (action === "start-stop") {
        const button = event.composedPath()[0];
        if (button.classList.contains("start")) {
          this.setConfig("default", true, "STOP");
          this.setTimer(true);
          button.classList.remove("start");
        } else {
          this.setTimer(false);
          this.setConfig("stop", true, "START");
        }
      }
    }
  }

  setConfig (color, status, content) {
    this.pomodoro.style.setProperty("--timer-color", `var(--${color}-color)`);
    this.disableTimer(status);
    this.start.textContent = content;
    this.start.classList.add("start");
  }

  disableTimer (status) {
    this.minutes.disabled = status;
    this.seconds.disabled = status;
    if (status) {
      this.minutes.classList.remove("blink");
      this.seconds.classList.remove("blink");
    } else {
      this.minutes.classList.add("blink");
      this.seconds.classList.add("blink");
    }
  }

  static get styles() {
    return /* css */`
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
        border: 9px solid var(--timer-color);
        box-sizing: content-box;
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
    `;
  }

  startTimer (min, sec) {
    if (min > 59) { min = 59 };
    if (sec > 59) { sec = 60 };
    sec--;

    if (sec < 0) {
      sec = 59;
      min--;

      if (min < 0) {
        this.pomodoro.style.setProperty("--timer-color", "var(--finish-color)");
        min = 0;
        sec = 0;
        clearInterval(this.nIntervalID);
        this.nIntervalID = null;
      }
    }
    this.minutes.value = min.toString().padStart(2, "0");
    this.seconds.value = sec.toString().padStart(2, "0");
  }

  setTimer (status) {
    if (status) {
      this.nIntervalID = setInterval(() => {
        const minute = this.minutes.value;
        const second = this.seconds.value;
        this.startTimer(minute, second);
      }, 1000);
    } else {
      clearInterval(this.nIntervalID);
      this.nIntervalID = null;
    }
  }

  init () {
    this.pomodoro = this.shadowRoot.querySelector(".pomodoro");
    this.minutes = this.shadowRoot.querySelectorAll("input")[0];
    this.seconds = this.shadowRoot.querySelectorAll("input")[1];
    this.start = this.shadowRoot.querySelector(".start");
  }

  connectedCallback() {
    this.render();
    this.init();
    this.addEventListener("click", this);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PomodoroTimer.styles}</style>
    <div class="pomodoro">
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
    </div>`;
  }
}

customElements.define("pomodoro-timer", PomodoroTimer);
