let words = require("./words.json");
let sentences = require("./sentences.json");

try {
  const { addExtra } = require("./extra");
  words = addExtra("words", words);
  sentences = addExtra("sentences", sentences);
} catch (e) {
  // don't use extra
}

module.exports = {
  words,
  sentences
};
