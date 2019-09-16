const isHangul = require("./isHangul");

const romanize = require("./jamo-to-roman");

const translitJamo = (input, position = 0, prev, method = "rr") => {
  // if given input is hangul, kick off romanization lookup
  if (isHangul(input)) {
    return lookup(romanize[input]);
  }

  // else if string, assume romanization completed
  if (typeof input === "string") {
    return input;
  }

  // if input from lookup is array
  // transliteration depends on jamo position
  if (Array.isArray(input)) {
    const i = position && position > 0 ? 1 : 0;
    return lookup(input[i]);
  }

  if (typeof input !== "object") {
    throw new Error("Nonobject should not get here.", input, typeof input);
  }

  // if provided jamo lookup object has key for requested method
  return lookup(input[method] || input[prev] || input["default"]);

  function lookup(key) {
    return translitJamo(key, position, prev, method);
  }
};

module.exports = translitJamo;
