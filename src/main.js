async function readData() {
  const response = await fetch("./src/data.json");
  const articles = await response.json();
  return articles;
}

function getRandomArticle(articles) {
  const index = Math.floor(Math.random() * articles.length);
  return articles.splice(index, 1)[0];
}

function insertDataIntoElement(article, index) {
  const element = document.getElementsByClassName("article").item(index);
  element.querySelector("h2").innerText = article.title.replaceAll("_", " ");
  element.querySelector("span").innerText = article.views;
}

async function initGame(numberOfArticles) {
  articles = await readData();
  for (let i = 0; i < numberOfArticles; ++i) {
    insertDataIntoElement(getRandomArticle(articles), i);
  }
}

function updateGame() {
  const container = document.getElementsByClassName("container").item(0);
  const score = container.querySelector("p");
  score.innerText = "Score: " + (parseInt(score.innerText.substring(6)) + 1);
  const firstArticle = container.querySelector(".article");
  container.removeChild(firstArticle);
  container.appendChild(firstArticle);
  insertDataIntoElement(getRandomArticle(articles), 3);
}

function gameOver() {}

function checkAnswer(answer) {
  const elements = document.getElementsByClassName("article");
  const firstViews = parseInt(elements.item(0).querySelector("span").innerText);
  const secondViews = parseInt(
    elements.item(1).querySelector("span").innerText
  );
  if (
    (firstViews >= secondViews && answer === "more") ||
    (firstViews <= secondViews && answer === "less")
  ) {
    updateGame();
  } else {
    gameOver();
  }
}

let articles;
initGame(4);
