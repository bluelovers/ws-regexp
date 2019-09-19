const isHangul = require("./isHangul");

const roman = require("./jamo-to-roman");

const romanizeJamo = (input, idx, next, method = "rr") => {
  if (!method) {
    throw new Error("Invalid method for " + input);
  }
  // if given input is hangul, look up jamo in dictionarys
  if (isHangul(input) && roman[input]) {
    // console.log({ roman: roman[input] });
    return lookup(roman[input]);
  }

  if (!input) {
    throw new Error(`${input} not recognized.`);
  }

  // else if string, assume romanization completed
  if (typeof input === "string") {
    return input;
  }

  // if input from lookup is array
  // transliteration depends on jamo position
  if (Array.isArray(input)) {
    const isJongseong = !idx ? 0 : 1;
    if (!input[isJongseong]) {
      throw new Error("Invalid jamo position", input);
    }
    return lookup(input[isJongseong]);
  }

  // if provided jamo lookup object has key for requested method
  if (method && input[method]) {
    return lookup(input[method]);
  }

  if (next && input[next]) {
    return lookup(input[next]);
  }

  if (!input.default) {
    throw new Error("Default jongseong not found");
  }

  return lookup(input.default);

  function lookup(key) {
    if (!method) {
      console.log("why", { method });
    }
    return romanizeJamo(key, idx, next, method);
  }
};

module.exports = romanizeJamo;
