const hangulPattern = require("./romanize.hangulPattern");

function romanizeWord(word) {
  return "romaja"; // TODO
}

function romanize(text) {
  return text.replace(hangulPattern, romanizeWord);
}

module.exports = romanize;
