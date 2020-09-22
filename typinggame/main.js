"use strict";

{
  function setWord() {
    word = textLists.splice(Math.floor(Math.random() * textLists.length), 1)[0];
    text.textContent = word;
  }
  const text = document.getElementById("text");

  const textLists = ["javascript", "ruby", "python", "Hello World"];

  let checkTexts = [];
  let loc;
  let score;
  let miss;
  let timer;
  let isPlaying;
  let timerId;
  let word;
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");
  const timerLabel = document.getElementById("timer");

  function init() {
    loc = 0;
    score = 0;
    miss = 0;
    timer = 90;
    text.textContent = "Ready?";
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    timerLabel.textContent = timer;
    isPlaying = false;
  }

  init();

  function updateTimer() {
    timerId = setTimeout(function () {
      timer--;
      timerLabel.textContent = timer;
      if (timer <= 0) {
        alert("gameOver");
        clearTimeout(timerId);
        return init();
      }
      updateTimer();
    }, 1000);
  }

  document.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    setWord();
    updateTimer();
  });
  function createText() {
    text.textContent = "";
    checkTexts = String(textLists[word])
      .split("")
      .map(function (value) {
        let span = document.createElement("span");
        span.textContent = value;
        text.appendChild(span);
        console.log(value);
        return span;
      });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== word[loc]) {
      miss++;
      missLabel.textContent = miss;
      return;
    }
    loc++;
    createText();
    word[loc].className = "add-blue";
    score++;
    scoreLabel.textContent = score;
    if (loc === word.length) {
      if (word.length === 0) {
        const elapsedTime = 90 - timer;
        timerLabel.textContent = `Remaining:${elapsedTime}`;
      }
      setWord();
    }
  });
}
