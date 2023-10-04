const X_CLASS = "cross";
const O_CLASS = "circle";
let isCircleTurn = true;
let isWin = false;
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let cells = document.querySelectorAll(`div.cell`);
let hoverCell = document.getElementById("holder-cells");
let footer = document.getElementById("holder-message");
let message_wining = document.getElementsByClassName("message-wining")[0];
let btn_reset = document.getElementsByClassName("btn-reset")[0];
let header_spans = document.querySelectorAll(".round");

// Handle Click Function

let handleClick = (e) => {
  // fill A CEll
  fillTheCell(e);
  // Check for Win
  isWin = checkWin();
  // Check for Draw
  checkDraw();
  // switch Round
  switchRound();
};

// Start The Game
function startTheGame() {
  if (footer.classList.contains("show-msg")) footer.classList.add("hide-msg");

  isCircleTurn = true;
  isWin = false;

  header_spans.forEach((span) => {
    span.classList.remove("active");
  });

  cells.forEach((cell) => {
    cell.classList.remove("circle");
    cell.classList.remove("cross");
    cell.setAttribute("data-cell", "");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: 1 });
  });

  hoverCell.classList.remove("circle-turn");
  hoverCell.classList.remove("cross-turn");

  if (isCircleTurn) {
    hoverCell.classList.add("circle-turn");
    header_spans[0].classList.remove("active");
    header_spans[1].classList.add("active");
  } else {
    hoverCell.classList.add("cross-turn");
    header_spans[1].classList.remove("active");
    header_spans[0].classList.add("active");
  }
}

startTheGame();

// Fill The Cell
function fillTheCell(e) {
  if (isCircleTurn) {
    e.target.classList.add("circle");
    hoverCell.classList.remove("circle-turn");
    hoverCell.classList.add("cross-turn");
    e.target.setAttribute("data-cell", "o");
  } else {
    e.target.classList.add("cross");
    hoverCell.classList.remove("cross-turn");
    hoverCell.classList.add("circle-turn");
    e.target.setAttribute("data-cell", "x");
  }
}

// Switch The Round
function switchRound() {
  isCircleTurn = !isCircleTurn;
  if (isCircleTurn) {
    header_spans[0].classList.remove("active");
    header_spans[1].classList.add("active");
  } else {
    header_spans[1].classList.remove("active");
    header_spans[0].classList.add("active");
  }
}

// Check Win
function checkWin() {
  return WIN_COMBOS.some((combo) => {
    const [a, b, c] = combo;
    const cellA = [...cells][a].getAttribute("data-cell");
    const cellB = [...cells][b].getAttribute("data-cell");
    const cellC = [...cells][c].getAttribute("data-cell");

    if (!(cellA == "" && cellB == "" && cellC == "")) {
      return cellC == cellA && cellA == cellB;
    }
  });
}

// Check Draw
function checkDraw() {
  if (isWin) {
    if (hoverCell.classList.contains("circle-turn"))
      msg_winner = "X Wins The Round";
    else msg_winner = "O Wins The Round";
    footer.classList.remove("hide-msg");
    footer.classList.add("show-msg");
    message_wining.innerHTML = msg_winner;
    return;
  }

  let res = [...cells].every((cell) => {
    return cell.getAttribute("data-cell") !== "";
  });

  if (res) {
    footer.classList.remove("hide-msg");
    footer.classList.add("show-msg");
    message_wining.innerHTML = "It's A Draw";
  }
}

btn_reset.addEventListener("click", (e) => {
  startTheGame();
});
