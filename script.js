let inGame = false;
let currLevel = 1; // default level is 1
const stringNames = ["E", "A", "D", "G", "B", "E2"];
const chordCollection = [
  {
    name: "G",
    strings: ["", "", "O", "O", "O", ""],
    notes: ["E3", "A2", "E2-3"],
  },
  {
    name: "C",
    strings: ["X", "", "", "O", "", "O"],
    notes: ["A3", "D2", "B1"],
  },
  {
    name: "D",
    strings: ["X", "X", "O", "", "", ""],
    notes: ["G2", "B3", "E2-2"],
  },
  {
    name: "Em",
    strings: ["O", "", "", "O", "O", "O"],
    notes: ["A2", "D2"],
  },
];

const chooseModeScreen = document.querySelector("#screen");
chooseModeScreen.addEventListener("click", function (e) {
  e.preventDefault();
  const modeChosen = e.target.getAttribute("id");

  if (!inGame) {
    document.querySelector("#practice-mode").id =
      "practice-mode-choosing-inactive";
    document.querySelector("#challenge-mode").id =
      "challenge-mode-choosing-inactive";
    document.querySelector(".level-text-hidden").className = "level-text";
    document.querySelector("#text-input-hidden").id = "text-input";
    document.querySelector("#submit-button-hidden").id = "submit-button";
  }

  for (let button of document.querySelectorAll(
    ".material-symbols-rounded-hidden"
  )) {
    button.className = "material-symbols-rounded";
  }

  if (modeChosen === "practice-mode") {
    runPracticeMode();
  } else if (modeChosen === "challenge-mode") {
    runChallengeMode();
  }
  inGame = true;
});

const guitarArea = document.querySelector(".guitar-area");
guitarArea.addEventListener("click", function (e) {
  let fretID = e.target.getAttribute("id");
  console.log(fretID);
});

const changeModeButton = document.querySelector("#choose-mode-button");
changeModeButton.addEventListener("click", function (e) {
  backToModeScreen();
});

function runPracticeMode() {
  document.querySelector(".current-game-mode").innerHTML =
    "Current Game Mode: Practice";
  if (currLevel === 1) {
    levelOnePracMode();
  } else if (currLevel === 2) {
    levelTwoPracMode();
  }
}

function levelOnePracMode() {
  let randomChord = Math.floor(Math.random() * chordCollection.length);
  const currentChord = chordCollection[randomChord];
  for (i = 0; i < 6; i++) {
    document.querySelector(`#mute-or-open-${stringNames[i]}`).innerHTML =
      currentChord.strings[i];
  }
  for (x of currentChord.notes) {
    document.querySelector(`#${x}`).innerHTML = "O";
  }
  const submitButton = document.querySelector("#submit-button");
  let wrong = false;
  submitButton.addEventListener("click", function (e) {
    let userAns = document.querySelector("#text-input").value;

    if (userAns === currentChord.name) {
      console.log("correcto");
      for (x of currentChord.notes) {
        document.querySelector(`#${x}`).innerHTML = "";
      }
      document.querySelector("#text-input").value = "";
      if (wrong) {
        document.querySelector(".wrong").className = "wrong-hidden";
        wrong = false;
      }
      levelOnePracMode();
    } else {
      if (!wrong) {
        document.querySelector(".wrong-hidden").className = "wrong";
        wrong = true;
      }
    }
  });
}

function levelTwoPracMode() {}

function runChallengeMode() {
  document.querySelector(".current-game-mode").innerHTML =
    "Current Game Mode: Challenge<br />";
  document.querySelector(".score").innerHTML = "Current Score: 0";
  document.querySelector(".time").innerHTML = "Time Left: 60";
}

function newChallengeGame() {
  //reset scores and timer
}

function backToModeScreen() {
  inGame = false;
  document.querySelector("#practice-mode-choosing-inactive").id =
    "practice-mode";
  document.querySelector("#challenge-mode-choosing-inactive").id =
    "challenge-mode";
  document.querySelector(".level-text").className = "level-text-hidden";
  document.querySelector("#text-input").id = "text-input-hidden";
  document.querySelector("#submit-button").id = "submit-button-hidden";
  for (let button of document.querySelectorAll(".material-symbols-rounded")) {
    button.className = "material-symbols-rounded-hidden";
  }
}
