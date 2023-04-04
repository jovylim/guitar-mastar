let inGame = false;
let currMode = "";
let currLevel = 1; // default level is 1
let userAnsL1 = "";
let userAnsL2 = [];
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
let randomChord = 0;
let currentChord = chordCollection[randomChord];

////////// event listeners

const chooseModeScreen = document.querySelector("#screen");
chooseModeScreen.addEventListener("click", function (e) {
  e.preventDefault();
  const modeChosen = e.target.getAttribute("id");
  if (modeChosen === "practice-mode") {
    currMode = modeChosen;
  }
  if (modeChosen === "challenge-mode") {
    currMode = modeChosen;
  }

  if (!inGame) {
    document.querySelector("#practice-mode").id =
      "practice-mode-choosing-inactive";
    document.querySelector("#challenge-mode").id =
      "challenge-mode-choosing-inactive";
    document.querySelector(".level-text-hidden").className = "level-text";
    document.querySelector("#text-input-hidden").id = "text-input";
    document.querySelector("#level1-submit-button-hidden").id =
      "level1-submit-button";
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
  if (currLevel === 2) {
    if (e.target.className === "fret-selected") {
      e.target.innerHTML = "";
      userAnsL2.splice(userAnsL2.indexOf(fretID), 1);
      e.target.className = "fret";
    } else if (e.target.className === "fret") {
      userAnsL2.push(fretID);
      e.target.className = "fret-selected";
      e.target.innerHTML = "O";
    }
  }
});

const changeModeButton = document.querySelector("#choose-mode-button");
changeModeButton.addEventListener("click", function (e) {
  backToModeScreen();
});

const level1SubmitButton = document.querySelector(".level1-submit-button");
level1SubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  userAnsL1 = document.querySelector("#text-input").value;
  checkAnsL1P();
});

const level2SubmitButton = document.querySelector(".level2-submit-button");
level2SubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("submut 2 pressed");
});

const level1Button = document.querySelector("#level-1");
level1Button.addEventListener("click", function (e) {
  e.preventDefault();
  clearFretboard();
  hideInputAreaDepending();
  currLevel = 1;
  showInputAreaDepending();
  document.querySelector(".current-game-level").innerHTML =
    "Current Level: Level 1 (from the finger pattern, identify the correct chord.)";
  if (currMode === "practice-mode") {
    runPracticeMode();
  } else if (currMode === "challenge-mode") {
    runChallengeMode();
  }
});

const level2Button = document.querySelector("#level-2");
level2Button.addEventListener("click", function (e) {
  e.preventDefault();
  clearFretboard();
  clearOpenMute();
  hideInputAreaDepending();
  currLevel = 2;
  showInputAreaDepending();
  userAnsL2 = [];
  document.querySelector(".current-game-level").innerHTML =
    "Current Level: Level 2 (from the given chord, identify the correct finger pattern.)";
  if (currMode === "practice-mode") {
    runPracticeMode();
  } else if (currMode === "challenge-mode") {
    runChallengeMode();
  }
});

///////////fns

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
  randomChord = Math.floor(Math.random() * chordCollection.length);
  currentChord = chordCollection[randomChord];
  for (i = 0; i < 6; i++) {
    document.querySelector(`#mute-or-open-${stringNames[i]}`).innerHTML =
      currentChord.strings[i];
  }
  for (x of currentChord.notes) {
    document.querySelector(`#${x}`).innerHTML = "O";
  }
}

function checkAnsL1P() {
  if (userAnsL1 === currentChord.name) {
    for (x of currentChord.notes) {
      document.querySelector(`#${x}`).innerHTML = "";
    }
    document.querySelector("#text-input").value = "";
    document.querySelector(".wrong").innerHTML = "correct! next one...";
    runPracticeMode();
  } else {
    document.querySelector(".wrong").innerHTML =
      "wrong! try again! ps: this is a caps sensitive game";
    document.querySelector("#text-input").value = "";
  }
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
  hideInputArea();
}

function hideInputArea() {
  document.querySelector(".level-text").className = "level-text-hidden";
  document.querySelector(".wrong").innerHTML = "";
  document.querySelector(".score").innerHTML = "";
  document.querySelector(".time").innerHTML = "";
  for (let button of document.querySelectorAll(".material-symbols-rounded")) {
    button.className = "material-symbols-rounded-hidden";
  }
  clearFretboard();
  hideInputAreaDepending();
}

function clearFretboard() {
  for (let fret of document.querySelectorAll(".fret")) {
    fret.innerHTML = "";
  }
  for (let fret of document.querySelectorAll(".fret-selected")) {
    fret.innerHTML = "";
    fret.className = "fret";
  }
}

function hideInputAreaDepending() {
  if (currLevel === 1) {
    document.querySelector("#text-input").value = "";
    document.querySelector("#text-input").id = "text-input-hidden";
    document.querySelector("#level1-submit-button").id =
      "level1-submit-button-hidden";
  } else if (currLevel === 2) {
    document.querySelector("#level2-submit-button").id =
      "level2-submit-button-hidden";
  }
}

function showInputAreaDepending() {
  if (currLevel === 1) {
    document.querySelector("#text-input-hidden").id = "text-input";
    document.querySelector("#level1-submit-button-hidden").id =
      "level1-submit-button";
  } else if (currLevel === 2) {
    document.querySelector("#level2-submit-button-hidden").id =
      "level2-submit-button";
  }
}

function clearOpenMute() {
  for (i = 0; i < 6; i++) {
    document.querySelector(`#mute-or-open-${stringNames[i]}`).innerHTML = "-";
  }
}
