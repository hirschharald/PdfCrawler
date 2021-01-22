const crawler = require("crawler-request");
const _ = require("lodash");

// get day and month for url
var tag = new Date().getDate();
var monat = new Date().getMonth() + 1;
if (tag < 10) tag = "0" + tag;
if (monat < 10) monat = "0" + monat;

const URL =
  "https://www.mtk.org/statics/ds_doc/downloads/21-" +
  monat +
  tag +
  "_Coronazahlen.pdf";

crawlpdf()
  .then((response) => {
    const newarr = response.toString().split(" ");
    console.log(newarr);
  })
  .catch((err) => console.log(err));

function crawlpdf() {
  return new Promise(async function (resolve, reject) {
    crawler(URL).then((response) => {
      const arr = response.text.split("\n");

      const kelkarr = arr.filter((itm) => {
        return _.startsWith(itm, "Kelkheim");
      });
      resolve(kelkarr);
    });
  }).catch((err) => console.log(err));
}
