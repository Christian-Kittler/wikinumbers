const fs = require("fs");
async function getArticles() {
  const counts = {};

  const years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  for (const year of years) {
    for (let i = 1; i <= 12; i++) {
      const month = i < 10 ? `0${i}` : i.toString();
      console.log(`Fetching ${month} of ${year}.`);
      const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/${year}/${month}/all-days`;
      const response = await fetch(url);
      const json = await response.json();

      const rawArticles = json.items[0].articles;
      rawArticles.forEach((r) => {
        const title = r.article;
        const forbiddenPrefixes = [
          "Portal",
          "Special",
          "Wikipedia",
          "Help",
          "File",
          "File_talk",
          "Template",
          "User",
          "Category",
        ];
        if (
          forbiddenPrefixes.some(
            (p) =>
              title === "Main_Page" ||
              title.toLowerCase().startsWith(`${p.toLowerCase()}:`) ||
              title.toLowerCase().startsWith(`${p.toLowerCase()}%`)
          )
        )
          return;

        counts[r.article] = (counts[r.article] ?? 0) + r.views;
      });
    }
  }
  const countsArray = Object.keys(counts).map((k) => ({
    title: k,
    views: counts[k],
  }));
  countsArray.sort((a, b) => b.views - a.views);
  console.log(`Saving ${countsArray.length} items.`);
  fs.writeFileSync("../src/data.json", JSON.stringify(countsArray));
}

getArticles();
