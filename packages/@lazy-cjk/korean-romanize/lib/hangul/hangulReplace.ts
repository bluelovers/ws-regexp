const hangulPattern = require("./unicode/hangulPattern");

const hangulReplace = (text, callback) => text.replace(hangulPattern, callback);

module.exports = hangulReplace;
