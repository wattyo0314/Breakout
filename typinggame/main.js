"use strict";

{
  const text = document.getElementById("text");

  const textLists = ["javascript", "ruby", "python", "Hello World"];

  let checkTexts = [];
  let loc = 0;
  let score = 0;
  let miss = 0;
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");

  createText();

  function createText() {
    const random = Math.floor(Math.random() * textLists.length);

    text.textContent = "";
    checkTexts = String(textLists[random])
      .split("")
      .map(function (value) {
        let span = document.createElement("span");
        span.textContent = value;
        text.appendChild(span);

        return span;
      });
  }

  document.addEventListener("keydown", keyDown);

  function keyDown(e) {
    if (e.key === checkTexts[loc].textContent) {
      checkTexts[loc].className = "add-blue";
      checkTexts.shift();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  }
}
