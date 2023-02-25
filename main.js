const elements = {
  board: document.querySelector(".board"),
  moves: document.querySelector(".statistics__moves"),
  time: document.querySelector(".statistics__time"),
  btn: document.querySelector(".btn button"),
};
const state = {
  selectedIcons: [],
  movesCounter: 0,
  timeCounter: 0,
  interval: null,
};

function generateArrIcons() {
  let arr = [];
  for (let i = 1; i <= 8; i++) {
    arr.push({
      img: `./assets/club-logos/${i}.png`,
    });
    arr.push({
      img: `./assets/club-logos/${i}.png`,
    });
  }
  return arr.sort(() => Math.random() - 0.5);
}

let arrIcons = generateArrIcons();

function generateBoard() {
  for (let i = 0; i < arrIcons.length; i++) {
    const img = document.createElement("img");
    img.setAttribute("src", `./assets/other-logos/question-mark.png`);
    img.setAttribute("icon-id", i);
    img.addEventListener("click", turnIconOver);
    elements.board.appendChild(img);
  }
}

function turnIconOver() {
  iconId = this.getAttribute("icon-id");
  this.setAttribute("src", `${arrIcons[iconId].img}`);
  state.selectedIcons.push(this);

  const arrImg = [...document.querySelectorAll(".board img")];
  const arrImgWithQuestionMark = arrImg.filter(
    (img) =>
      img.attributes.src.nodeValue == `./assets/other-logos/question-mark.png`
  );

  if (state.selectedIcons.length == 2) {
    if (
      state.selectedIcons[0].getAttribute("icon-id") ===
      state.selectedIcons[1].getAttribute("icon-id")
    ) {
      return (state.selectedIcons = [this]);
    }

    arrImg.forEach((img) => img.removeEventListener("click", turnIconOver));

    if (state.selectedIcons[0].src === state.selectedIcons[1].src) {
      arrImgWithQuestionMark.forEach((img) =>
        img.addEventListener("click", turnIconOver)
      );
      state.selectedIcons = [];
    } else {
      setTimeout(() => {
        arrImgWithQuestionMark.forEach((img) =>
          img.addEventListener("click", turnIconOver)
        );
        state.selectedIcons.forEach((icon) => {
          icon.addEventListener("click", turnIconOver);
          icon.setAttribute("src", `./assets/other-logos/question-mark.png`);
        });
        state.selectedIcons = [];
      }, 700);
    }
  }

  if (state.movesCounter == 0) {
    state.interval = setInterval(timeInterval, 1000);
    elements.btn.style.display = "block";
  } else if (arrImgWithQuestionMark.length == 0) {
    clearInterval(state.interval);
    elements.btn.innerHTML = "New Game";
  }

  elements.moves.innerHTML = `Moves: ${++state.movesCounter}`;
}

function timeInterval() {
  elements.time.innerHTML = `Time: ${++state.timeCounter} sec`;
}

function restartGame() {
  elements.board.innerHTML = "";
  clearInterval(state.interval);
  arrIcons = generateArrIcons();
  generateBoard();
  state.selectedIcons = [];
  state.movesCounter = 0;
  state.timeCounter = 0;
  state.interval = null;
  elements.moves.innerHTML = "Moves: 0";
  elements.time.innerHTML = "Time: 0 sec";
  elements.btn.style.display = "none";
  elements.btn.innerHTML = "Restart";
}

elements.btn.addEventListener("click", restartGame);

generateBoard();
