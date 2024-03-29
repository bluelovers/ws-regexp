import { State } from './state';

import { minimize } from './minimize';

import { toRegex } from './regex';

/**
 * A Trie represents a set of strings in a tree data structure
 * where each edge represents a single character.
 * https://en.wikipedia.org/wiki/Trie
 */
export class Trie
{
	alphabet: Set<string>
	root: State

	constructor()
	{
		this.alphabet = new Set;
		this.root = new State;
	}

	/**
	 * Adds the given string to the trie.
	 * @param {string} string - the string to add
	 */
	add(string: string)
	{
		let node = this.root;
		for (let char of string)
		{
			this.alphabet.add(char);
			node = node.transitions.get(char);
		}

		node.accepting = true;
	}

	/**
	 * Adds the given array of strings to the trie.
	 * @param {Array<string>} strings - the array of strings to add
	 */
	addAll(strings: string[])
	{
		for (let string of strings)
		{
			this.add(string);
		}
	}

	/**
	 * Returns a minimal DFA representing the strings in the trie.
	 * @return {State} - the starting state of the minimal DFA
	 */
	minimize()
	{
		return minimize(this.root);
	}

	/**
	 * Returns a regex pattern that matches the strings in the trie.
	 * @param {string} flags - The flags to add to the regex.
	 * @return {string} pattern - The regex pattern.
	 */
	toString(flags?: string)
	{
		return toRegex(this.minimize(), flags);
	}

	/**
	 * Returns a regex that matches the strings in the trie.
	 * @param {string} flags - The flags to add to the regex.
	 * @return {RegExp}
	 */
	toRegExp(flags?: string)
	{
		return new RegExp(this.toString(flags), flags);
	}
}

export default Trie;
