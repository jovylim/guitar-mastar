const chooseModeScreen = document.querySelector(".screen");
chooseModeScreen.addEventListener("click", function (e) {
  e.preventDefault();
  const modeChosen = e.target.getAttribute("id");
  if (modeChosen === "practice-mode") {
    // run prac mode bla bla bla
    console.log("prac mode clicked");
  } else if (modeChosen === "challenge-mode") {
    // run challenge mode bla bla bla
    console.log("chalenge mode clicked");
  }
});
