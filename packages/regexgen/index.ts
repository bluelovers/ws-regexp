import Trie from './lib/trie';

/**
 * Generates a regular expression that matches the given input strings.
 * @param {Array<string>} inputs
 * @param {string} flags
 * @return {RegExp}
 */
export function regexgen(inputs: string[], flags?: string)
{
	let trie = new Trie;
	trie.addAll(inputs);
	return trie.toRegExp(flags);
}

export { Trie }

regexgen.Trie = Trie;

export default regexgen;
