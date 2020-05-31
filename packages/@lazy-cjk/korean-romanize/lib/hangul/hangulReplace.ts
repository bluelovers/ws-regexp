import hangulPattern from './unicode/hangulPattern';

export function hangulReplace(text, callback) { return text.replace(hangulPattern, callback); }

export default hangulReplace;
