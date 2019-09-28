// Unicode data for category "Letter (other)"
const lo = require("unicode/category/Lo");

const snakeToCamel = str =>
  str.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace("-", "")
      .replace("_", "")
  );

const clean = data =>
  Object.entries(data)
    .map(([key, value]) => ({
      [snakeToCamel(key)]:
        typeof value === "string" && value.trim() === "" ? undefined : value
    }))
    .reduce((acc, item) => Object.assign(acc, item), {});

const getDataFor = codePoint => {
  const data = lo[codePoint];

  return clean(data);
};

module.exports = getDataFor;
