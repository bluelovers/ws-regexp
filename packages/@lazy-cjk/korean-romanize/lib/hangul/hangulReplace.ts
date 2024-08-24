import { hangulPattern } from './unicode/hangulPattern';

export function hangulReplace(text: string, callback: (s: string) => string) {
	return text.replace(hangulPattern, callback);
}

export default hangulReplace;
