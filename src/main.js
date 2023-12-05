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
  const articles = await readData();
  for (let i = 0; i < numberOfArticles; ++i) {
    insertDataIntoElement(getRandomArticle(articles), i);
  }
}

initGame(4);
