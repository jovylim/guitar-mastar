const chooseModeScreen = document.querySelector("#screen");
chooseModeScreen.addEventListener("click", function (e) {
  e.preventDefault();
  const modeChosen = e.target.getAttribute("id");
  if (modeChosen === "practice-mode") {
    runPracticeMode();
  } else if (modeChosen === "challenge-mode") {
    runChallengeMode();
  }
  document.querySelector("#practice-mode").id = "mode-choosing-inactive";
  document.querySelector("#challenge-mode").id = "mode-choosing-inactive";
  // activate buttons and input
});

function runPracticeMode() {
  console.log("prac");
}
function runChallengeMode() {
  console.log("chal");
}
