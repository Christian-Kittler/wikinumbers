function readHighscores() {
  let highscores = localStorage.getItem("highscores");
  return highscores == null ? [] : JSON.parse(highscores);
}

function updateHighscores() {
  const highscores = readHighscores();
  const highscoreEntries = document.getElementsByTagName("tr");
  for (let i = 0; i < highscores.length; ++i) {
    const tr = highscoreEntries[i + 1];
    tr.children[0].textContent = highscores[i].score;
    tr.children[1].textContent = highscores[i].date;
  }
}

updateHighscores();
