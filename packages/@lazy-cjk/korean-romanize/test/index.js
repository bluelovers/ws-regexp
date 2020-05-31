import words from './words.json';
import sentences from './sentences.json';

try {
  const { addExtra } = require("./extra");
  words = addExtra("words", words);
  sentences = addExtra("sentences", sentences);
} catch (e) {
  // don't use extra
}

export {
  words,
  sentences
}
