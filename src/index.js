const crawler = require("crawler-request");
const _ = require("lodash");

// get day and month for url
var tag = new Date().getDate();
var vortag = new Date().getDate() - 1;
var monat = new Date().getMonth() + 1;
if (tag < 10) tag = "0" + tag;
if (monat < 10) monat = "0" + monat;

const url =
  "https://www.mtk.org/statics/ds_doc/downloads/21-" +
  monat +
  tag +
  "_Coronazahlen.pdf";

const urlVorTag =
  "https://www.mtk.org/statics/ds_doc/downloads/21-" +
  monat +
  vortag +
  "_Coronazahlen.pdf";

crawlpdf(url)
  .then((response) => {
    console.log(response);
  })
  .catch((err) =>
    crawlpdf(urlVorTag)
      .then((response) => {
        console.log(response);
      })
      .catch(err => console.log(err))
  );

function crawlpdf(url) {
  return new Promise(async function (resolve, reject) {
    crawler(url)
      .then((response) => {
        if (response.status == 404) reject(new Error(404));
        const arr = response.text.split("\n");
        var kelkarr = arr.filter((itm) => {
          return _.startsWith(itm, "Kelkheim");
        });
        kelkarr = kelkarr.toString().split(" ");

        resolve(kelkarr);
      })
      .catch((err) => reject(err));
  });
}
