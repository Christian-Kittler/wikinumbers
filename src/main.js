async function readData() {
  const response = await fetch("./src/data.json");
  const articles = await response.json();
  return articles;
}

function formatNumber(num) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(num);
}

function getRandomArticle(articles) {
  const index = Math.floor(Math.random() * articles.length);
  return articles.splice(index, 1)[0];
}

function insertDataIntoElement(article, index) {
  const element = document.getElementsByClassName("article").item(index);
  element.querySelector("h2").innerText = article.title.replaceAll("_", " ");
  element.querySelector(".views").innerText = article.views;
  element.querySelector(".formatted-views").innerText = formatNumber(
    article.views
  );
}

async function initGame(numberOfArticles) {
  articles = await readData();
  for (let i = 0; i < numberOfArticles; ++i) {
    insertDataIntoElement(getRandomArticle(articles), i);
  }
}

function updateGame(container, score) {
  score.innerText = "Score: " + (parseInt(score.innerText.substring(6)) + 1);
  const firstArticle = container.querySelector(".article");
  container.removeChild(firstArticle);
  container.appendChild(firstArticle);
  insertDataIntoElement(getRandomArticle(articles), 3);
}

function gameOver(score) {
  const currentScore = parseInt(score.innerText.substring(6));
  const newHighscore = {
    score: currentScore,
    date: new Date().toLocaleDateString(),
  };
  let highscores = localStorage.getItem("highscores");
  highscores = highscores === null ? [] : JSON.parse(highscores);
  if (highscores.length === 0) {
    highscores.push(newHighscore);
  } else {
    for (let i = 0; i < highscores.length; ++i) {
      if (highscores[i].score < currentScore) {
        highscores.splice(i, 0, newHighscore);
        break;
      }
    }
    if (highscores.length === 4) {
      highscores.pop();
    }
  }
  localStorage.setItem("highscores", JSON.stringify(highscores));
  document.body.classList.add("game-over");

  for (const article of document.querySelectorAll(".article")) {
    const heading = article.querySelector("h2");

    const anchor = document.createElement("a");
    anchor.textContent = heading.textContent;
    anchor.href = `https://en.wikipedia.org/wiki/${anchor.textContent.replaceAll(
      " ",
      "_"
    )}`;

    heading.textContent = "";
    heading.appendChild(anchor);
  }
}

function checkAnswer(answer) {
  const container = document.getElementsByClassName("container").item(0);
  const score = container.querySelector("p");
  const elements = document.getElementsByClassName("article");
  const firstViews = parseInt(
    elements.item(0).querySelector(".views").innerText
  );
  const secondViews = parseInt(
    elements.item(1).querySelector(".views").innerText
  );

  const result = document.querySelector("#result");
  const sign = secondViews <= firstViews ? ">" : "<";
  result.textContent = `${
    elements.item(0).querySelector(".formatted-views").innerText
  } ${sign} ${elements.item(1).querySelector(".formatted-views").innerText}`;

  if (
    (secondViews >= firstViews && answer === "more") ||
    (secondViews <= firstViews && answer === "less")
  ) {
    updateGame(container, score);
  } else {
    gameOver(score);
  }
}

let articles;
initGame(4);
