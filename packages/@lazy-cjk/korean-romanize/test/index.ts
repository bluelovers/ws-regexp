import words from './words.json';
import sentences from './sentences.json';

try {
  const { addExtra } = require("./extra");
  // @ts-ignore
  words = addExtra("words", words);
  // @ts-ignore
  sentences = addExtra("sentences", sentences);
} catch (e) {
  // don't use extra
}

export {
  words,
  sentences
}
