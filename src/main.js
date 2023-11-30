async function readData() {
  const response = await fetch("./src/data.json");
  const articles = await response.json();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
