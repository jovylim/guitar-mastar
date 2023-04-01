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
  document.querySelector(".level-text-hidden").className = "level-text";
  document.querySelector("#text-input-hidden").id = "text-input";
  document.querySelector("#submit-button-hidden").id = "submit-button";

  for (let button of document.querySelectorAll(
    ".material-symbols-rounded-hidden"
  )) {
    button.className = "material-symbols-rounded";
  }
});

function runPracticeMode() {
  console.log("prac");
}
function runChallengeMode() {
  console.log("chal");
}
